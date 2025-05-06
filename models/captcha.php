<?php
    session_start();
    // Generation of random string
    $random_alpha = md5(rand());
    // Generate a captcha of length
    $captcha = strtoupper(substr($random_alpha, 0, 4));
    $_SESSION["CaptchaLogin"] = $captcha;

    
    // Width and Height of captcha
    $target_layer = imagecreatetruecolor(120,44);
    // Backgorund color of captcha
    $captcha_background = imagecolorallocate($target_layer, 240, 240, 240);
    imagefill($target_layer,0,0,$captcha_background);
    // Captch Text Color RGB
    $captcha_text_color = imagecolorallocate($target_layer, 199,0,57);

    // // Lines
    // $line_color = imagecolorallocate($target_layer, 64,64,64); 
    // for($i=0;$i<6;$i++) {
    //     imageline($target_layer,0,rand()%50,200,rand()%50,$line_color);
    // }
    // Pixels
    $pixel_color = imagecolorallocate($target_layer, rand(0,255),rand(0,255),rand(0,255));
    for($i=0;$i<15;$i++) {
        // Width and height of text image rand()
        //imagesetpixel($target_layer,rand()%200,rand()%80,$pixel_color);
        //imagesetpixel($target_layer,rand()%100,rand()%40,$pixel_color);
        $color_circulo = imagecolorallocate($target_layer, rand(0,255),rand(0,255),rand(0,255));
        $radio= rand(5,40);
        imagearc($target_layer, rand(5,120), rand(1,44), $radio, $radio,  0, 360, $color_circulo);
    }  
    // Text Size
    $font_size = 30;
    // you_are_the_one is a font file
    imagettftext($target_layer, $font_size, 0, 10, 35, $captcha_text_color, $_SERVER["DOCUMENT_ROOT"]."/empresas-de-seguridad-privada/models/arial.ttf", $captcha);
    header("Content-type: image/jpeg");
    imagejpeg($target_layer);
?>