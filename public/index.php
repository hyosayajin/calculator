<?php
    if (defined("DIR")) {

        require constant("DIR") . "vendor/autoload.php";

        define("__DIR", dirname(__FILE__) . DIRECTORY_SEPARATOR );
        
    } else {
        
        require dirname(__DIR__) . DIRECTORY_SEPARATOR . "vendor\autoload.php";
        
        define("__DIR", dirname(__DIR__) . DIRECTORY_SEPARATOR );
    }

    const 
    __DS = DIRECTORY_SEPARATOR,
    __PARTIALS = __DIR . "partials" . __DS,
    __ROOT = __DIR . "public" . __DS,
    PROJECT_NAME = "calculator ",
    PROJECT_ID = "v ",
    PROJECT_BASE = "base-" . PROJECT_ID . "2.2.3", 
    PROJECT_V = PROJECT_NAME . "1.0";

    $params = [
        "AnimationsSetting",
        "ColorsSetting"
    ];

    $result = [];

    foreach ($params as $i => $paramValue) {
        
        if (isset($_COOKIE[$paramValue])) 

            if (!preg_match('/Default/',$_COOKIE[$paramValue]))

                $result[] = " ".$_COOKIE[$paramValue];

            else 

                $result[] = null;
        else
            $result[] = null;
    }

    $bodyClass = "class=\"body{$result[0]}{$result[1]}\"";

?>

<!DOCTYPE html>

<html lang="fr">

<?php require_once __PARTIALS . "manifest.php"?>

<?php require_once __PARTIALS . "head.php"?>

<body id="body" <?= $bodyClass ?>>

    <div id="app" class="app">

<?php require_once __PARTIALS . "header.php"?>


<?php require_once __PARTIALS . "main.php"?>

        
<?php require_once __PARTIALS . "footer.php"?>

        <div class="shortCuts-container">

<?php require_once __PARTIALS . "helper.php"?>

<?php require_once __PARTIALS . "setting.php"?>

        </div>

    </div>

<?php require_once __PARTIALS . "javascript.php"?>

</body>

</html>