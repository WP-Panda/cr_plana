<?php
/**
 * The template for displaying all single posts.
 *
 * @package cr-plana
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php // get_template_part( 'content', 'single' ); ?>

			<?php // cr_plana_post_nav(); ?>
			<div class="tabs-1 grid_12">
				<ul class="tabs">
					<?php $content = get_the_content();
					 if( !empty($content) ) { ?>
					<li><a href="#product-description">Описание и характеристики</a></li>
					<?php }?>
					<?php $content = get_post_meta($post->ID,'gp',false);
					 if( !empty($content) ) { ?>
					<li><a href="#files">Файлы</a></li>
					<?php }?>
					<?php $content = get_post_meta( $post->ID, 'field-9', true );
					 if( !empty($content) ) { ?>
					<li><a href="#prises">Прайсы</a></li>
					<?php }?>
					<li><a href="#application">Заявка, Опросный лист</a></li>
					<?php $content = get_post_meta( $post->ID,'too_posts',true);
					 if( !empty($content) ) { ?>
					<li><a href="#more-too">См так же</a></li>
					<?php }?>
				</ul>
				<section class="tab_content_wrapper">
					<?php $content = get_the_content();
					 if( !empty($content) ) { ?>
				        <article class="tab_content" id="product-description">
				            <?php the_content(); ?>
				        </article>
				    <?php }?>
				    <?php $content = get_post_meta($post->ID,'gp',false);
					 if( !empty($content) ) { ?>
				        <article class="tab_content" id="files">
				            <ul>
					           	<?php
					            $variable = get_post_meta($post->ID,'gp',false);
					            foreach ($variable as $keyss) {
					            	echo '<li>';
					            	$name = $keyss['file_name'];
					            	$url = wp_get_attachment_url( $keyss['gfield-11'] );
		    						$type = substr(strrchr($url, '.'), 1);
		    						if ($type == 'doc') { 
		    							echo '<i class="fa fa-file-word-o"></i>';
		    						} elseif ($type == 'pdf'){
		    							echo '<i<i class="fa fa-file-pdf-o"></i>';
		    						} else {
		    							echo '<i class="fa fa-file-o"></i>';
		    						}
		    						echo '<a href="' . $url . '" title="Скачать файл">' . $name . '</a>';
		    						echo '</li>';
					            }
					            ?>
					        </ul>
				        </article>
			        <?php }?>
			        <?php $content = get_post_meta( $post->ID, 'field-9', true );
					if( !empty($content) ) { ?>
				        <article class="tab_content" id="prises">
				        	<?php 
				        	$str = get_post_meta( $post->ID, 'field-9', true );
				        	$trans = get_html_translation_table( HTML_ENTITIES );
				        	$trans = array_flip($trans);
				            echo strtr(do_shortcode( $str ), $trans); 
				            ?>
				        </article>
				    <?php }?>
			        <article class="tab_content" id="application">
			            <?php echo do_shortcode( '[contact-form-7 id="98" title="Опросный лист,заявка"]' ); ?>
			        </article>
			        <?php $content = get_post_meta( $post->ID,'too_posts',true);
					 if( !empty($content) ) { ?>
				        <article class="tab_content" id="more-too">
				            <?php 
				            	$ids = explode(",", get_post_meta( $post->ID,'too_posts',true) );
				            	$args = array( 'post__in'     => $ids );
				            
				            $query_my = new WP_Query( $args );
				           if( $query_my->have_posts() ) : while ( $query_my->have_posts() ) : $query_my->the_post();
				            echo '<span class="too-posts grid_6">';
				           		if( has_post_thumbnail()) the_post_thumbnail();
				            	echo '<a href="' . get_permalink() . '" title="Перейти к ' . get_the_title() . '">' . get_the_title() . '</a>';
				            echo '</span>';
				            endwhile;endif; 
				            ?>
				        </article>
			        <?php }?>
			    </section>
			</div>

		<?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php // get_sidebar(); ?>
<?php get_footer(); ?>