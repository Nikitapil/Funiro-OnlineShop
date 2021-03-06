let project_folder = "dist";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    favicon: project_folder + "/",
    fonts: project_folder + "/fonts/",
    audio: project_folder + "/audio/",
    json: project_folder + "/json/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/*.js",
    img: [source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"],
    favicon: source_folder + "/*.png",
    fonts: source_folder + "/fonts/*.ttf",
    audio: [source_folder + "/audio/*.{mp3,ogg,mp4}"],
    json: source_folder + "/json/*.json",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    audio: source_folder + "/audio/*.{mp3,ogg}",
    json: source_folder + "/json/*.json",
  },
  clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webphtml = require("gulp-webp-html"),
  /* webpcss = require("gulp-webp-css"), */
  svgSprite = require("gulp-svg-sprite"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter");
prettyHtml = require("gulp-pretty-html");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function html() {
  return (
    src(path.src.html)
      .pipe(fileinclude())
      /* .pipe(webphtml()) */
      .pipe(prettyHtml({
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
      indent_inner_html: false,
    }))
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
  );
}


function css() {
  return (
    src(path.src.css)
      .pipe(
        scss({
          outputStyle: "expanded",
        })
      )
      .pipe(group_media())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 5 versions"],
          cascade: true,
        })
      )
      /* .pipe(webpcss()) */
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
  );
}

function clean(params) {
  return del(path.clean);
}

function images() {
  return src(path.src.img)
    /* .pipe(
      webp({
        quality: 70,
      })
    ) */
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationlevel: 3,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}
function favicon() {
  return (src(path.src.favicon)
      .pipe(dest(path.build.favicon))
      .pipe(browsersync.stream())
  );
}
function audio () {
  return (src(path.src.audio)
      .pipe(dest(path.build.audio))
      .pipe(browsersync.stream())
  );
}
function json () {
  return (src(path.src.json)
      .pipe(dest(path.build.json))
      .pipe(browsersync.stream())
  );
}
function fonts(params) {
  src(path.src.fonts)
  .pipe(ttf2woff())
  .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts));
}

gulp.task("otf2ttf", function () {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/fonts/"));
});

gulp.task("svgSprite", function () {
  return gulp
    .src([source_folder + "/iconsprite/*.svg"])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg", //sprite file name
            example: true,
          },
        },
      })
    )
    .pipe(dest(path.build.img));
});

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.audio], audio);
  gulp.watch([path.watch.json], json);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts, favicon, audio,json));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.json = json;
exports.audio = audio;
exports.favicon = favicon;
exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;
