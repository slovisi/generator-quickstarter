# Require any additional compass plugins here.


# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "img"
javascripts_dir = "js"


# Uncomment the following line if you use webfonts,
# change the value to reflect your own structure
<% if (!useWebfont) { %># <% } %>fonts_dir = "font"


# environment = :development or :production
# environment = :production

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
line_comments = (environment == :production) ? false : true

#
sass_options = (environment == :production) ? {:debug_info => false} : {:debug_info => true}
