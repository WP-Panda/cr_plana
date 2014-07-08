<?php
	/*
	Template Name: Каталог
	*/
	get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<?php  
			$array = array(
				'hide_empty' => true,
				'exclude' => 1,
				'title_li' =>'',
			);	

			$cat_list = get_categories( $array );

			foreach ($cat_list as $key) { ?>
				<h2>
					<a href="<?php echo get_category_link( $key->term_id ); ?>" title="Category Name">
						<span class="">
							<?php echo $key->name ?>
						</span>
					</a>
				</h2>
				<div class="clear"></div>
				<?php $postslist =  get_posts( 'category=' . $key->term_id );
				$n = 1; 
				foreach ($postslist as $post) {  
					setup_postdata($post); 
					$class = ( $n%2 == 1 ) ? ' left-null' : ' right-null' ; ?>
					<div class="post-catalog-page grid_6<?php echo $class; ?>">
					<?php if( has_post_thumbnail() ) the_post_thumbnail(); ?>
						<h3><a href="<?php echo get_permalink(); ?>" title="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
						<?php $str = get_the_excerpt();
						echo wp_trim_words( $str, 20, '' ); ?>
					</div>
					<?php $n++; 
				} 
				wp_reset_postdata();
			} ?>
		</main><!-- #main -->
	</div><!-- #primary -->
<?php get_footer(); ?>