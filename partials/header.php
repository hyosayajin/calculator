<?php
    $li_list = [
        "c composer" => "https://ccomposer.fr",
        "portfolio" => "https://ccomposer.fr/portfolio/home",
    ];
?>
<header id="header" class="header">

    <nav id="headerNavigation" class="header-navigation">

        <ul id="headerNavigationList">

            <?php foreach ($li_list as $key => $value) : ?>

                <li <?= "id=\"{$key}\" class=\"{$key}\"" ?> >

                    <a <?= "href='{$value}'" ?> target="_blank"> <?= $key ?> </a>

                </li>

            <?php endforeach ?>

        </ul>

    </nav>

    <div class="project-version">

        <span> <?= ucfirst(PROJECT_V) ?> </span>
        <sub> <?= ucfirst(PROJECT_BASE) ?> </sub>

    </div>

</header>