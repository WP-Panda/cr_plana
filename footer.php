<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package cr-plana
 */
?>
	<?php 
	if (! is_front_page() ) {
    echo '<div class="widget-area-footer">';
			echo '<div class="wigets_in_footer" role="complementary">';
			if ( is_active_sidebar( 'cr-left-footer-sidebar' ) ) 
				dynamic_sidebar( 'cr-left-footer-sidebar' ); 
			if ( is_active_sidebar( 'cr-left-center-footer-sidebar' ) ) 
				dynamic_sidebar( 'cr-left-center-footer-sidebar' ); 
			if ( is_active_sidebar( 'cr-right-center-footer-sidebar' ) ) 
				dynamic_sidebar( 'cr-right-center-footer-sidebar' ); 
			if ( is_active_sidebar( 'cr-right-footer-sidebar' ) ) 
				dynamic_sidebar( 'cr-right-footer-sidebar' );
			echo '</div>';
		echo '</div>';  
	} ?>
	</div><!-- #content -->

	<footer id="colophon" class="site-footer container_12" role="contentinfo">
		<div class="contayner_12"></div>	
			<div class="company-info grid_4">
				<span class="company-name"><?php bloginfo( 'name' ); ?></span>
				<span class="company-address"><?php echo plana_option( 'plana_address' ); ?></span>
				<span class="company-phone"><?php echo plana_option( 'plana_phone_1' ); ?></span>
				<span class="company-phone"><?php echo plana_option( 'plana_phone_2' ); ?></span>
				<span class="company-phone"><?php echo plana_option( 'plana_phone_3' ); ?></span>
				<span class="company-fax"><?php echo plana_option( 'plana_fax_1' ); ?></span>
				<span class="company-fax"><?php echo plana_option( 'plana_fax_1' ); ?></span>
				<span class="company-emaile"><?php echo plana_option( 'plana_email_1' ); ?></span>
				<span class="company-emaile"><?php echo plana_option( 'plana_email_2' ); ?></span>
				<span class="company-emaile"><?php echo plana_option( 'plana_email_3' ); ?></span>
			</div>
			<?php if ( ! is_active_sidebar( 'sidebar-1' ) ) {
				return;
			} ?>
			<div class="widget-area grid_4" role="complementary">
				<?php dynamic_sidebar( 'sidebar-1' ); ?>
			</div>
			<div class="site-info">
				<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'cr-plana' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'cr-plana' ), 'WordPress' ); ?></a>
				<span class="sep"> | </span>
				<?php printf( __( 'Theme: %1$s by %2$s.', 'cr-plana' ), 'cr-plana', '<a href="http://underscores.me/" rel="designer">Underscores.me</a>' ); ?>
			</div><!-- .site-info -->
		</div>	
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
