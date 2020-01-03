<?php
/**
 * digitalism functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package digitalism
 */


//------------------------------------------------------------------Setup--------------------------------------------------
define("DIGITALISM_DEV", true);


//------------------------------------------------------------------Includes-------------------------------------------------
include(get_theme_file_path('/includes/enqueue.php'));
include(get_theme_file_path('/includes/add-theme-support.php'));
include(get_theme_file_path('/includes/widget.php'));
include(get_theme_file_path('/includes/content-width.php'));  
/** Implement the Custom Header feature. */
require get_template_directory() . '/inc/custom-header.php';

/* Custom template tags for this theme. */
require get_template_directory() . '/inc/template-tags.php';

/** Functions which enhance the theme by hooking into WordPress. */
require get_template_directory() . '/inc/template-functions.php';

/** Customizer additions */
require get_template_directory() . '/inc/customizer.php';

/** Load Jetpack compatibility file. */
if ( defined( 'JETPACK__VERSION' ) ) {
require get_template_directory() . '/inc/jetpack.php';
}


//------------------------------------------------------------------Hooks-------------------------------------------------
add_action( 'after_setup_theme', 'digitalism_setup' );
add_action( 'after_setup_theme', 'digitalism_content_width', 0 );
add_action( 'wp_enqueue_scripts', 'digitalism_jquery', 0 );
add_action( 'widgets_init', 'digitalism_widgets_init' );
add_action( 'wp_enqueue_scripts', 'digitalism_scripts' );


//------------------------------------------------------------------Shortcode-------------------------------------------------














