<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package cr-plana
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<?php if ( is_home() || is_front_page() ) {
				$link = plana_option( 'plana_mainbaner_link') ? plana_option( 'plana_mainbaner_link') : '' ;
				if ($link) echo '<a href="' . $link . '">'; ?>
				<img src='<?php echo plana_option( 'plana_mainbaner'); ?>' alt=''>
				<?php if ($link) echo '</a>';
					$array = array(
						'hide_empty' => false,
						'exclude' => 1,
						'title_li' =>'',
					);	
				$cat_list = get_categories( $array );
				foreach ($cat_list as $key) { 
					$img_1 = plana_tax_option( 'plana_cat_image_1', $key->term_id );
					$img_2 = plana_tax_option( 'plana_cat_image_2', $key->term_id ); ?>
					<img class="grid_4" src="<?php echo $img_1['src'];?>">
					<a href="<?php echo get_category_link( $key->term_id ); ?>" title="Category Name">
						<span class="grid_4"><?php echo $key->name ?></span>
					</a>
 					<img class="grid_4" src="<?php echo $img_2['src'];?>">
				<?php }
				global $post;
				$ids = explode(",", plana_option( 'plana_page_id_too_main'));
				$args = array( 'include' => $ids );
				$pages = get_pages( $args );
				foreach ( $pages as $page ) { ?>
	 				<div class="main-page-post grid_6">
		 				<?php echo get_the_post_thumbnail($page->ID, 'thumbnail'); ?> 
							<a href="<?php echo get_page_link( $page->ID ); ?>" title="<?php echo $page->post_title; ?>">
								<?php echo $page->post_title; ?> 
							</a>
							<span><?php echo wp_trim_words( $page->post_content, 25 , '...' ) ; ?></span>
					</div>
				<?php } ?>
			<?php } else { ?>
					<header class="page-header">
					<h2 class="page-title">
						<?php single_cat_title(); ?>
					</h2>
				</header>
				<div class="clear"></div>
				<?php  if ( have_posts() ) : $n = 1; while ( have_posts() ) : the_post(); $n++;
				$class = ( $n%2 == 1 ) ? ' left-null' : ' right-null'; ?>
					<div class="post-catalog-page grid_6<?php echo $class; ?>">	
						<?php if( has_post_thumbnail() ) the_post_thumbnail(); ?>
						<h3><a href="<?php echo get_permalink(); ?>" title="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
						<?php $str = get_the_excerpt();
							echo wp_trim_words( $str, 20, '' ); ?>
					</div>
					<?php if($n%2 !== 0 ) { ?>
					<div class="clear"></div>
					<?php } ?>
				<?php endwhile; else: ?>
					<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
				<?php endif; 
					
				wp_reset_postdata();
			} ?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php // get_sidebar(); ?>
<?php get_footer(); ?>
