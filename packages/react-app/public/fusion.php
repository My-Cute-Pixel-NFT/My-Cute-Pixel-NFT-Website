<?php

$id1 = $_GET["id1"];
$id2 = $_GET["id2"];

$test = true;

if ($test) {
    if ($id1 == 1 || $id1 == 5) $response = array('compatible' => true);
    else $response = array('compatible' => false);
    echo json_encode($response);
} else {
    $compatible = false;
    $lunianURI = "https://ipfs.io/ipfs/QmWpqJakh2WHvmv8WzKH25UrbpkQvDcjWo8AzbZ57CfWeS/";
    $lunian1URI = $lunianURI . $id1 . ".json";
    $lunian1JSON = file_get_contents($lunian1URI);
    $lunian1Obj = json_decode($lunian1JSON);
    $lunian1Atts =  $lunian1Obj->attributes;
    $lunian2URI = $lunianURI . $id2 . ".json";
    $lunian2JSON = file_get_contents($lunian2URI);
    $lunian2Obj = json_decode($lunian2JSON);
    $lunian2Atts =  $lunian2Obj->attributes;
    for ($i = 0; $i < count($lunian1Atts); $i++) {
        $lunian1Att = $lunian1Atts[$i];
        $lunian2Att = $lunian2Atts[$i];
        if ($lunian1Att->trait_type != "Spirit" && $lunian1Att->trait_type != "Speed" &&
            $lunian1Att->trait_type != "Constitution" && $lunian1Att->trait_type != "Fluffiness") {
            if ($lunian1Att->value == $lunian2Att->value) {
                $compatible = true;
                break;
            }
        }
    }
    $response = array('compatible' => $compatible);
    echo json_encode($response);
}