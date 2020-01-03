<?php
/**
 * Enqueue scripts and styles.
 */
function digitalism_scripts() {
    $ver = DIGITALISM_DEV ? time() : false;

	// CCS FILES 
	wp_enqueue_style( 'digitalism-style', get_stylesheet_uri(), array(), $ver );
	
	
	// JS FILES DIST MODE
	// wp_enqueue_script( 'digitalism-vendor-file', get_template_directory_uri() . '/dist/vendor.js', array(), $ver, true );
	// wp_enqueue_script( 'digitalism-index-file', get_template_directory_uri() . '/dist/index.js', array(), $ver, true );

	//JS FILES DEV MODE
	wp_enqueue_script( 'digitalism-vendor-file', get_template_directory_uri() . '/dev/vendor.js', array(), $ver, true );
	wp_enqueue_script( 'digitalism-index-file', get_template_directory_uri() . '/dev/index.js', array(), $ver, true );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

function digitalism_jquery(){
	wp_deregister_script('jquery');
	// How to move jquery in the footer
	wp_enqueue_script( 'digitalism-jquery-file', 'https://code.jquery.com/jquery-3.3.1.min.js', array(), $ver, true );
}