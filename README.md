Use this script in your projects and change the style according to the theme of your project.

#### How to use:
Put the following line related to the style at the beginning of the file and in the head tag
```html
<link rel="stylesheet" href="dtpicker.css">
```
And put the following line of javascript code at the end of the file and after the body tag
```html
<script src="dtpicker.js"></script>
```
**Note**: The path of the file should be changed relative to the storage address of the css/js file in the project.

#### Example:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DateTimePicker</title>
    <link rel="stylesheet" href="assets/css/dtpicker.css">
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.png">
  </head>
  <body style="background-color:#e83e8c">
    <input type="text" name="dtpicker" placeholder="Date only" /><br>
    <input type="text" name="dtpicker1" placeholder="Time only" />
    <p style="border: 2px solid #5e4ecb;color:#fff;width: 180px;" name="dtpicker2">DateTime</p>
  </body>
  <script type="text/javascript" src="assets/js/dtpicker.js"></script>
  <script>
    dtpicker('input[name="dtpicker"]',{template:'my',startYear:2000,endYear:2100,mode:0});//Date
    dtpicker('input[name="dtpicker1"]',{template:'my',mode:1});//Time
    dtpicker('p[name="dtpicker2"]',{template:'my',startYear:2000,endYear:2100,mode:2});//DateTime
  </script>
</html>
```
**Note**: Options:

> {template:'name of template', startYear: YYYY, endYear: YYYY, mode: n}
```
template: dark , light , primary , secondary , info , success , warning , danger , my
startYear and endYear: full year(ex: 2023)
mode: 0(just Date) , 1(just Time) , 2(Date and Time)

```

#### Example:

> {template:'my', startYear:2000, endYear:2050, mode:2}

### Thank you
