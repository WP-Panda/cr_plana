<?php
/*
Template Name: Карта
*/
?>
<?php get_header(); ?>
<div id="main-block">
    <div id="content">
    <div class="html_sitemap">

    <h3>Продкуты:</h3>
    <ul>
    <?php
    $cats = get_categories('exclude='); //***Сюда вставьте через запятую ID категорий, которые желаете исключить. Если таких категорий нет, то оставьте поле пустым.
  
    foreach ($cats as $cat) {
      echo '<li>'."\n".'<strong>Раздел:</strong> '.$cat->cat_name.''."\n";
      echo '<ul>'."\n";
  
      query_posts('posts_per_page=-1&cat='.$cat->cat_ID); //-1 показывать все статьи категории. 1 показывать последние статьи.
  
         while(have_posts()): the_post();
         $category = get_the_category();
            if ($category[0]->cat_ID == $cat->cat_ID) {?>
            <li><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></li>
       <?php }
        endwhile;
       ?>
      </ul>
      </li>
    <?php } ?>
    </ul>
    <?php
    wp_reset_query();
    ?>

    <h3>Статьи:</h3>
    <ul>
    <?php
        wp_list_pages('exclude='); //***Сюда вставьте через запятую ID страниц, которые желаете исключить. Если таких страниц нет, то оставьте поле пустым.
    ?>
    </ul>
  
    
  
    <!--h3>Архивы:</h3>
    <ul>
    <?php
      wp_get_archives();
    ?>
    </ul-->
</div> 
<?php get_footer (); ?>