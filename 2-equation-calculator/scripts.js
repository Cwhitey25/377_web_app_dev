function calculateDensity(){
    var mass = document.forms[0].elements["mass"].value;
    var volume = document.forms[0].elements["volume"].value;

    var density = ( mass/volume ).toFixed(2);

    document.getElementById("density").innerHTML = density + " kilogram(s) per meters³";
}

function calculateVelocity(){
    var distance = document.forms[1].elements["distance"].value;
    var time = document.forms[1].elements["time"].value;

    var velocity = ( distance/time ).toFixed(2);

    document.getElementById("velocity").innerHTML = velocity + " meter(s) per second";
}

function calculateKE(){
    var kMass = document.forms[2].elements["kinetic mass"].value;
    var kDistance = document.forms[2].elements["kinetic distance"].value;
    var kTime = document.forms[2].elements["kinetic time"].value;

    var velo = kDistance/kTime;

    var KE =  ( ((1/2)*kMass) * (velo*velo) );

    document.getElementById("kinetic").innerHTML = KE + " joule(s)"; 
}