<?php
/**
 * cr-plana functions and definitions
 *
 * @package cr-plana
 */
if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Set Constant
 */
define( 'PLANA' , get_bloginfo( 'stylesheet_directory' ) . '/');

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'cr_plana_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function cr_plana_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on cr-plana, use a find and replace
	 * to change 'cr-plana' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'cr-plana', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	//add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'cr-plana' ),
		'catalog' => __( 'Catalog Menu', 'cr-plana' ),
	) );
	
	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	/*add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link'
	) );*/

	add_theme_support( 'post-thumbnails' );

	// Setup the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'cr_plana_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // cr_plana_setup
add_action( 'after_setup_theme', 'cr_plana_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function cr_plana_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Главный сайдбар футера', 'cr-plana' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );

	register_sidebar(array(
		'name' => __('Левая область виджетов футера','wp_panda'),
		'id' => 'cr-left-footer-sidebar',
		'before_widget' => '<div id="%1$s" class="slide-left footer-widget-col %2$s grid_3">',
		'after_widget' => '<div style="clear:both;"></div></div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>',
	));

	register_sidebar(array(
		'name' => __('Левая центральная область виджетов футера','wp_panda'),
		'id' => 'cr-left-center-footer-sidebar',
		'before_widget' => '<div id="%1$s" class="slide-bottom footer-widget-col %2$s grid_3">',
		'after_widget' => '<div style="clear:both;"></div></div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>',
	));

	register_sidebar(array(
		'name' => __('Правая центральная область виджетов футера','wp_panda'),
		'id' => 'cr-right-center-footer-sidebar',
		'before_widget' => '<div id="%1$s" class="slide-bottom footer-widget-col %2$s grid_3">',
		'after_widget' => '<div style="clear:both;"></div></div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>',
	));

	register_sidebar(array(
		'name' => __('Правая область виджетов футера','wp_panda'),
		'id' => 'cr-right-footer-sidebar',
		'before_widget' => '<div id="%1$s" class="slide-right footer-widget-col %2$s grid_3">',
		'after_widget' => '<div style="clear:both;"></div></div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>',
	));
}
add_action( 'widgets_init', 'cr_plana_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function cr_plana_scripts() {
	wp_enqueue_script( 'jquery' );

	wp_enqueue_style( 'cr-plana-style', get_stylesheet_uri() );

	wp_enqueue_script( 'cr-plana-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_enqueue_style( 'cr-plana-navigation', get_template_directory_uri() . '/inc/fonts/font-awesome.css', null, false);

	wp_enqueue_script( 'cr-plana-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );
	wp_enqueue_script( 'cr-plana-all-js', get_template_directory_uri() . '/js/all.js', array(), '20130115', true );


	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'cr_plana_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require_once 'inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require_once 'inc/extras.php';

/**
 * Customizer additions.
 */
require_once 'inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require_once 'inc/jetpack.php';

/**
 * Slightly Modified Options Framework
 */
require_once 'admin/index.php';

/**
 * Add post metabox class
 */
//require_once 'inc/metaboxes/posts-metaboxes.php';

/**
 * Add post metabox
 */
//require_once 'inc/metaboxes/metaboxes.php';

/**
 * Add tax meta box class
 */
require_once 'inc/tax-meta-class/tax-meta-class.php';
require_once( 'Custom-Meta-Boxes/custom-meta-boxes.php' );
/**
 * Add tax meta box
 */
require_once 'inc/tax-meta-box.php';

/**
 * Get option
 */
function plana_option( $option ){
	global $smof_data;
	$val = $smof_data[ $option ];
	return $val;
}

/**
 * Get option tax
 */
function plana_tax_option( $option, $tax_id ){
	$val = get_tax_meta( $tax_id, $option, true);
	return $val;	 
}

/*
 *Add post type shortcodes
 */

add_action( 'init', 'create_shortcode' );
function create_shortcode() {
	register_post_type( 'shortcodes',
		array(
			'labels' => array(
				'name' => __( 'Шорткоды' ),
				'singular_name' => __( 'шорткод' )
			),
		'public' => true,
		'has_archive' => false,
		)
	);
}

//if (get_post_type() == 'shortcodes') {
/*function true_id($args){
	$args['post_page_id'] = 'ID';
	return $args;
}*/
	function true_custom($column, $id){
		if($column === 'post_page_id'){
			echo $id;
		}
	}
	 
	//add_filter('manage_posts_columns', 'true_id', 5);
	add_action('manage_shortcodes_posts_custom_column', 'true_custom', 5, 2);


	// Регистрируем (резервируем) колонку для вывода значения произвольного поля source_link_custom_field
	function price_column_register( $columns ) {
		unset($columns['title']);
		$out = array();
		foreach($columns as $col=>$name){
			//if(++$i==3){
			$out['price'] = __( 'Значение поля Source', 'my-plugin' );
			$out['post_page_id'] = 'ID';//}

	$out[$col] = $name;
	}
	 return $out;
	}
	add_filter('manage_shortcodes_posts_columns', 'price_column_register', 5);


	// Выводим содержимое произвольного поля в зарегистрированную колонку
	function price_column_display( $column_name, $post_id ) {
	if ( 'price' != $column_name )
	return;
	 
	$price = get_the_excerpt();
	if ( !$price )
	$price = '<em>' . __( 'отсутствует', 'my-plugin' ) . '</em>';
	 
	echo $price;
	}
	add_action( 'manage_shortcodes_posts_custom_column', 'price_column_display', 10, 2 );							

//}	

//
function cr_block_short($atts, $content = null) {
		extract(shortcode_atts(array(
		"id" => ''
		), $atts));
			$post_get = get_post( $id );
			return '<span class="short">' . $post_get->post_content . '</span>';
	}
add_shortcode("cr_block", "cr_block_short");