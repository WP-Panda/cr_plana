<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package cr-plana
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">

	<header id="masthead" class="site-header container_12" role="banner">
		<div class="site-branding">
			<div class="site-title grid_3">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'description' ); ?>">
					<img src="<?php echo plana_option( 'plana_logo' ); ?>" alt="">
				</a>
			</div>
			<div class="feeback-icon grid_2">
        <a href="<?php echo plana_option( 'plana_sitemap' ); ?>" title="Карта сайта"><i class="fa fa-sitemap"></i></a>
        <i class="fa fa-search"></i>
        <a href="<?php echo plana_option( 'plana_feedback' ); ?>" title="Обратная связь"><i class="fa fa-envelope-o"></i></a>
      </div>
			<div class="emaile grid_3">
        <span><?php echo plana_option( 'plana_email_1' ); ?></span>
        <span><?php echo plana_option( 'plana_email_2' ); ?></span>
        <span><?php echo plana_option( 'plana_email_3' ); ?></span>
      </div>
      <div class="phones grid_4">
        <span><?php echo plana_option( 'plana_phone_1' ); ?></span>
        <span><?php echo plana_option( 'plana_phone_2' ); ?></span>
        <span><?php echo plana_option( 'plana_phone_3' ); ?></span>
        <span><?php echo plana_option( 'plana_fax_1' ); ?></span>
        <span><?php echo plana_option( 'plana_fax_2' ); ?></span>
      </div>
			<nav id="site-navigation" class="main-navigation grid_12" role="navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
			</nav><!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->
  <div class="clear"></div>
<?php if ( is_home() || is_front_page() ) : ?>
  	<div class="example-using-html">
  		<?php $slides  = plana_option( 'plana_slider' );
  		foreach ($slides as $slide) { ?>
 			<img data-lazy-src="<?php echo $slide['url']; ?>" />
  		<?php } ?>
  	</div>
  	<? /* --div class="container_12 slider-nav">
    	<a href="#" class="go-previous grid_1 prefix_2"><i class="fa fa-angle-left"></i></a>  
	    <div class="my-navigation grid_6">
	        <?php #$slides  = plana_option( 'plana_slider' );
				#foreach ($slides as $slide) { ?>
					<span><?php # echo $slide['title']; ?></span>
				<?php } ?>
	    </div>
    	<a href="#" class="go-next grid_1"><i class="fa fa-angle-right"></i></a>
    </div */ ?>

    <script type="text/javascript">
    (function($) {
        $(document).ready(function(){
            $('.example-using-html').DrSlider({
                'showControl': false,
                'showNavigation': false,
                //'classButtonPrevious': 'go-previous',
                //'classButtonNext': 'go-next',
                //'classNavigation': 'my-navigation',
                'userCSS': true
            });
        });
    })(jQuery);
    </script>

    <?php endif; ?>

    <?php if( is_page() || is_single() ) {
      $url = get_post_meta( get_the_id(), 'bunner', true ); 
      $url = wp_get_attachment_url( $url );
      ?>
        <img src="<?php echo $url; ?>" alt="">
    <?php } ?>

    <?php if( is_category() || is_archive() ) { 
    $queried_object = get_queried_object();
      $url = plana_tax_option( 'plana_cat_banner', $queried_object->term_id ); ?>
      <img src="<?php echo $url['src']; ?>" alt="">
    <?php } ?>

    <div class="container_12 tag-nav">
      <a href="#" class="go-previous grid_1"><i class="fa fa-angle-left"></i></a>  
      <div class=" grid_10">
        <?php 
          $tags = get_tags();
          $html = '<div class="post_tags">';
          foreach ($tags as $tag){
            $tag_link = get_tag_link($tag->term_id);

            $html .= "<a href='{$tag_link}' title='{$tag->name} Tag' class='{$tag->slug}'>";
            $html .= "{$tag->name}</a>";
          }
          $html .= '</div>';
          echo $html; 
          ?>
      </div>
      <a href="#" class="go-next grid_1"><i class="fa fa-angle-right"></i></a>
    </div>
    
    <div class="clear"></div>
	<div id="content" class="site-content container_12">
   <span>Каталог</span><?php if( !is_page() || !is_front_page() ) wp_nav_menu( array( 'theme_location' => 'catalog' ) ); ?>