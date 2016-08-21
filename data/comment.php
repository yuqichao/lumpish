<?php
    header("Content-type:application/json");
    $arr = array();
    for ($x=0; $x <= 20; $x++) {
        array_push($arr, array(
            "id" => $x,
            "title" => "javascript中的this指向问题",
            "desc" => "在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
            "user" => "solverpeng",
            "comment" => "0",
            "read" => "46",
            "prev" => $x == 0 ? 0 : $x - 1,
            "next" => $x + 1,
            "img" => "img/person.jpg",
            "content" => $x . "在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
            "time" => "2016-08-10 14:15"
        ));
    }
    echo json_encode($arr);
?>