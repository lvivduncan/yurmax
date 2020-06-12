<?php
// внутрішні
namespace ProcessWire;

echo '<section id="page-title">';
// картинка у центрі
if ($page->image) {
    $image = $page->image->maxWidth(600)->url;
    echo '<div id="page-title-image"><img src="' . $image . '" alt="' . $page->image->desc . '"></div>';
}

// текст під картинкою
if ($page->text) echo '<div id="desc">' . $page->text . '</div>';

echo '</section>';

// заголовок
if ($page->page_name) echo '<div class="title" id="title" data-stellar-background-ratio="0.5">' . $page->page_name . '</div>';

// блоки скрола
if ($page->block) {

    echo '<div id="cats">';

    foreach ($page->block as $item) {

        if ($item->block_image != '') {

            echo '<section>';
            echo '<div class="img">';
            echo '<div class="slider">';

            foreach ($item->block_image as $image) {

                $large = $image->width(1000);
                $thumb = $image->size(720, 355);
                echo '<img src="' . $thumb->url . '" alt="' . $image->description . '" />';
            }
            echo '</div>';
            echo '</div>';
            echo '<div class="desc">';
            echo '<h4>', $item->block_title, '</h4>';
            echo $item->block_text;
            echo '</div>';
            echo '</section>';
        } elseif ($item->block_bg != '') {
            echo '<section data-stellar-background-ratio="0.3" style="background: url(', $item->block_bg->url, ')">';
            echo '<div class="img"></div>';
            echo '<div class="desc">';
            echo '<h4>', $item->block_title, '</h4>';
            echo $item->block_text;
            echo '</div>';
            echo '</section>';
        }
    }
    echo '</div>';
}

// фотогалерея і текст поруч
if ($page->photo) {
    echo '<section class="photo-and-text">';

    $cnt = 0;
    foreach ($page->photo as $item) {
        $cnt++;

        // повне фото
        $photo = $item->photo_image->first();
        // мініатюра
        $thumb = $photo->size(800, 600);

        if ($cnt % 2 === 0) {
            // робимо шахову розкладку
            echo '<article>';
            echo '
                    <figure>
                        <a data-fancybox="gallery-' . $cnt . '" href="' . $photo->url . '">
                            <img src="' . $thumb->url . '" alt="" title="">
                        </a>
                    ';

            // if($item->photo_image !== $item->photo_image->first()){
            foreach ($item->photo_image->slice(1) as $image) {
                echo '<a data-fancybox="gallery-' . $cnt . '" href="' . $image->url . '"></a>';
            }
            // }

            echo '</figure><figcaption>';

            if ($item->photo_title) echo '<h3>' . $item->photo_title . '</h3>';
            if ($item->photo_text) echo '<p> ' . $item->photo_text . ' </p>';

            echo '</figcaption>';

            echo '</article>';
        } else {
            echo '<article>';
            echo '<figcaption>';

            if ($item->photo_title) echo '<h3>' . $item->photo_title . '</h3>';
            if ($item->photo_text) echo '<p> ' . $item->photo_text . ' </p>';

            echo '</figcaption>';
            echo '
                    <figure>
                        <a data-fancybox="gallery-' . $cnt . '" href="' . $photo->url . '">
                            <img src="' . $thumb->url . '" alt="" title="">
                        </a>
                    ';

            // if($item->photo_image !== $item->photo_image->first()){
            foreach ($item->photo_image->slice(1) as $image) {
                echo '<a data-fancybox="gallery-' . $cnt . '" href="' . $image->url . '"></a>';
            }
            // }

            echo '</figure>';
            echo '</article>';
        }
    }
    echo '</section>';
}

if ($page->text_name) echo '<div class="title" data-stellar-background-ratio="0.5">' . $page->text_name . '</div>';

if ($page->text_summary) echo '<div class="content">' . $page->text_summary . '</div>';

if ($page->gallery) {

    $cnt = 0;
    foreach ($page->gallery as $item) {

        // заголовок галереї
        if ($item->gallery_title) {
            echo '<div class="title" data-stellar-background-ratio="0.5">';
            echo $item->gallery_title;
            echo '</div>';
        }

        // висота мініатюрки
        $item->img_height != '' ? $height = $item->img_height : $height = 250;

        // ширина мініатюрки
        $item->img_width != '' ? $width = $item->img_width : $width = 250;

        // реагуємо на чекбокс
        $item->items === 1 ? $true = '<header id="levus-buttons"><span>Ім\'я</span><span>Ціна</span><span>Розмір</span></header>' : $true = '';

        // виводимо книпки, якщо стоїть галочка
        echo $true;

        // додаємо ідентифікатор, якщо стоїть галочка
        $item->items === 1 ? $id = ' id="levus-items"' : '';

        $cnt++;
        // якщо є фото
        if ($item->img) {
            echo '<div class="gallery' . $item->img_number . '" ' . $id . '>';
            foreach ($item->img as $image) {

                // велике фото
                $large = $image->img_photo;

                // мініатюра
                $thumb = $large->size($width, $height, 'north');

                // реагуємо на чекбокс
                $item->items === 1 ? $figure = '<figure data-item=\'' . $image->img_name . ',' . $image->img_price . ',' . $image->img_size . '\'>' : $figure = '<figure>';

                // виводимо тег (або з дата-атрибутами або без них)
                echo $figure;
                echo '<a data-fancybox="images-', $cnt, '" href="', $large->url, '" title="', $image->description, '">';
                echo '<img src="', $thumb->url, '" alt="', $image->description, '" title="', $image->description, '" />';
                echo '</a>';
                echo '<figcaption>';

                if ($image->img_name)
                    echo '<p> ' . $image->img_name . ' </p>';

                if ($image->img_size)
                    $size1 = $image->img_size;

                if ($image->img_size_2)
                    $size2 = 'x' . $image->img_size_2;

                if ($image->img_size_3)
                    $size3 = 'x' . $image->img_size_3;

                echo '<p> ' . $size1 . $size2 . $size3 . ' </p>';

                if ($image->img_price)
                    echo '<p> ' . $image->img_price . ' грн/м.п.</p>';

                echo $item->items === 1 ? '<span class="button" data-name="' . $image->img_name . '" data-price="' . $image->img_price . '" data-size="' . $size1 . $size2 . $size3 . '"></span>' : '';

                echo '</figcaption>';
                echo '</figure>';
            }
            echo '</div>';
        }
        echo '</div>';
    }
}
