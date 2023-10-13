<?php
    $socialNetwork = [
        "linkedIn" => [
            "href" => "https://www.linkedin.com/in/faiz-t-552ba7236",
            "imgSrc" => "/assets/img/social/linkedin.svg"
        ],
        
        "instagram" => [
            "href" => "https://instagram.com/hyo_dev?igshid=OGQ5ZDc2ODk2ZA==",
            "imgSrc" => "/assets/img/social/instagram.svg"
        ],
        
        "snapchat" => [
            "href" => "https://t.snapchat.com/pQH2y26k",
            "imgSrc" => "/assets/img/social/snapchat.svg"
        ],
        
        "twitter" => [
            "href" => "https://twitter.com/dev_ft0?s=21&t=RMGdswzjODB9AUtspv2Oeg",
            "imgSrc" => "/assets/img/social/twitter.svg"
        ],
        
        "github" => [
            "href" => "https://github.com/hyosayajin",
            "imgSrc" => "/assets/img/social/github.svg"
        ],
    ]
?>

<footer id="footer" class="footer">

    <nav id="social" class="social">
        <ul>
            <?php foreach ($socialNetwork as $key => $value): ?>

            <li>

                <a <?= "href= \"{$value["href"]}\"" ?> target="_blank" > <img <?= "src= \"{$value["imgSrc"]}\"" ?>  <?= "alt=\"{$key}\"" ?>> </a>

            </li>

            <?php endforeach ?>
            
        </ul>
    </nav>

    <span id="copyR" class="copy-r"> ©️ All right reserved to ccomposer.fr | 2023 </span>

    <menu id="shortCut" class="footer-menu">
        
        <button id="helperButton" class="trigger-btn"> h </button>
        <button id="parameterButton" class="trigger-btn"> p </button>

    </menu>
    
</footer>