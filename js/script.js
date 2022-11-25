// DATE 

function refresh(){
    let t = 1000; // rafraîchissement en millisecondes
    setTimeout('showDate()',t)
}

function showDate() {
    let date = new Date()
    let h = date.getHours();
    let m = date.getMinutes();
    if( h < 10 ){ h = '0' + h; }
    if( m < 10 ){ m = '0' + m; }
    let time = h + ':' + m
    $id('time').innerHTML = time;
    refresh();
 }

// BATTERY

function showBattery(){
  navigator.getBattery().then(function(battery) {
    if (battery.level == 1.0) {
      $id('battery').innerHTML = ("100%");
    }
    $id('battery').innerHTML = (battery.level*100 + "%");});
}

// FEATURE

calcArray = new Array();
test = 0;

// FUNCTION TO GET ELEMENT BY ID
function $id(id) {
        return document.getElementById(id);
      }


function calculate(id,n) {

  // SET TO 0
  if(n == 'ac') {
    updateDisplay(id);
  }

  // DELETE LAST NUMBER
  else if(n == 'backspace') {
    if($id(id).value < 10 && $id(id).value > -10) {
      $id(id).value=0;
    } else {
      $id(id).value=$id(id).value.slice(0,$id(id).value.length-1);
    }
  }

  // SET TO POSTIVE OR NEGATIVE
  else if(n == 'mol') {
    $id(id).value = $id(id).value*(-1);
    
    if(calcArray[id][0] == "="){
      calcArray[id][2] = $id(id+'_resultat').value;
      calcArray[id][3] = 0;
    } else {
      calcArray[id][3] = $id(id+'_resultat').value; 
    }
    pas_ch = 1;
  }

  // CALCULATE PERCENTAGE
  else if(n == '%') {
    $id(id).value = $id(id).value/(100);
  }

  // DO + OR - OR * OR /
  else {

    if(n != "="){
      $id("operator_" + n).style.backgroundColor = "white";
      $id("operator_" + n).style.color = "orange";
    } else{

      for (let i = 0; i < document.getElementsByClassName("button operator").length; i++) {
        document.getElementsByClassName("button operator")[i].style.backgroundColor = "orange";
        document.getElementsByClassName("button operator")[i].style.color = "white";
      }
    }

    if(calcArray[id][0]!='=' && calcArray[id][1]!=1) {
      eval('calcul='+calcArray[id][2]+calcArray[id][0]+calcArray[id][3]+';');
      $id(id).value=calcul;
      calcArray[id][2]=calcul;
      calcArray[id][3]=0;
    }
    calcArray[id][0] = n;
  }

  if(test==0)
  {
    calcArray[id][1] = 1;
  }
  else
  {
    test=0;
  }
  document.getElementById(id).focus();
  return true;

}

function add_calc(id,n) {

  if(calcArray[id][2] != 0){
    document.getElementsByClassName("button option")[0].innerHTML = "C";
    console.log(calcArray[id][2]);
  } else{
    document.getElementsByClassName("button option")[0].innerHTML = "AC";
  }

  if(calcArray[id][1]==1){
    $id(id).value=n;
  } else {
    $id(id).value+=n;
  }

  if(calcArray[id][0]=='=')
  {
          calcArray[id][2] = $id(id).value;
          calcArray[id][3] = 0;
  }
  else
  {
          calcArray[id][3] = $id(id).value;
  }

    calcArray[id][1] = 0;
    $id(id).focus();
    return true;
  }

function updateDisplay(id) {
  $id(id).value = 0;
  calcArray[id] = new Array('=',1,'0','0',0);
  document.getElementById(id).focus();
  return true;
}

function keyTrigger(id,evt) {

  // 0 => 9 NUM PAD
  if((evt.keyCode>95) && (evt.keyCode<106)) {
    let nbr = evt.keyCode-96;
    add_calc(id,nbr);
  }

  // 0 => 9 KEYBOARD
  else if((evt.keyCode>47) && (evt.keyCode<58)) {
    var nbr = evt.keyCode-48;
    add_calc(id,nbr);
  }

  // COMMA
  else if(evt.keyCode==110){
    add_calc(id,',');
  }

  // BACKSPACE
  else if(evt.keyCode==8) {
    calculate(id,'backspace');
  }

  // EQUAL
  else if(evt.keyCode==13){
    calculate(id,'=');
  }

  // SET TO 0
  else if(evt.keyCode==27 || evt.keyCode==46) {
    calculate(id,'ac');
  }

  // MULTIPLY
  else if(evt.keyCode==106){
    calculate(id,'*');
  }

  // ADD
  else if(evt.keyCode==107){
    calculate(id,'+');
  }

  // SUBTRACT
  else if(evt.keyCode==109){
    calculate(id,'-');
  }

  // DIVIDE
  else if(evt.keyCode==111){
    calculate(id,'/');
  }
 // PERCENTAGE
  else if(evt.keyCode==192){
    calculate(id,'%');
  }

  return true;
}