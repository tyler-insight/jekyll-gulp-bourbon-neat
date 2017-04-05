# jekyll-gulp-bourbon-neat

This project is an enhanced and built upon version of shakeyShane's [jekyll-gulp-sass-browser-sync](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync)

A starter project including full setup for Jekyll, GulpJS, SASS, AJAX, AutoPrefixer, Bourbon, Neat &amp; BrowserSync

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)
4. [Bourbon](https://github.com/thoughtbot/bourbon) - `$ gem install bourbon` (version 5.0)
5. [Neat](https://github.com/thoughtbot/neat) - `$ gem install neat` (version 2.0)
6. [Bitters](https://github.com/thoughtbot/bitters) - `$ gem install bitters`

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp
```

**jekyll**

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Using Neat Grids

[Official Neat Documentation](http://neat.bourbon.io/docs/latest/)

You can find an example of the grid setup by running `gulp` and going to the Grid System page

### Breakpoints

The grid layouts are setup using 5 breakpoints, with mobile being the default styling *(these can be found in _scss/base/_variables.scss)*:

```
1. $small: 600px;
2. $medium: 900px;
3. $large: 1200px;
4. $larger: 1800px;
5. $super: 2400px;
```

### Grid Structure

There are two main types of grids setup, grids with gutters and edge to edge grids. Within these structures, there are classes made to break the content into columns. *(these can be found in _scss/base/layout.scss)*

#### Grid with Gutters

The below chart breaks down the column structure for desktop:

| #Columns | Class Name    |
| :- | :------------------- |
| 1/1  | `.full-column`       |
| 1/2  | `.half-column`       |
| 1/3  | `.one-thirds-column` |
| 2/3  | `.two-thirds-column` |
| 1/4  | `.fourth-column`     |
| 1/6  | `.sixth-column`      |
| 5/6  | `.five-sixth-column` |
| 1/12 | `.twelfth-column`    |



To use a grid with gutters, your code would look something like this:

```
<section>
  <div class="one-thirds-column">
    <h4>.one-thirds-column</h4>
  </div>
  <div class="one-thirds-column">
    <h4>.one-thirds-column</h4>
  </div>
  <div class="one-thirds-column">
    <h4>.one-thirds-column</h4>
  </div>
</section>
```

#### Edge to Edge Grid

The below chart breaks down the column structure for desktop:

| #Columns | Class Name    |
| :- | :------------------- |
| 1/1  | `.full-column-full`       |
| 1/2  | `.half-column-full`       |
| 1/3  | `.one-thirds-column-full` |
| 2/3  | `.two-thirds-column-full` |
| 1/4  | `.fourth-column-full`     |
| 1/6  | `.sixth-column-full`      |
| 1/12 | `.twelfth-column-full`    |

To use a grid with gutters, your code would look something like this:

```
<section>
  <div class="one-thirds-column-full">
    <h4>.one-thirds-column-full</h4>
  </div>
  <div class="one-thirds-column-full">
    <h4>.one-thirds-column-full</h4>
  </div>
  <div class="one-thirds-column-full">
    <h4>.one-thirds-column-full</h4>
  </div>
</section>
```

#### Centered Columns

Another class is able to center columns should you desire to have a centered layout. To do this, simply add the appropriate class name with `-centered` at the end as an addition class. For example:

```
<section>
  <div class="one-thirds-column">
    <h4>.one-thirds-column-full</h4>
  </div>
</section>
```

becomes

```
<section>
  <div class="one-thirds-column one-thirds-column-centered">
    <h4>.one-thirds-column .one-thirds-column-centered</h4>
  </div>
</section>
```
