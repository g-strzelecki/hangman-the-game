let pass = "Bez pracy nie ma kołaczy";
pass = pass.toUpperCase();

let passHidden = "";

let passLen = pass.length;

let missedCount = 0;

let yes = new Audio("samples/yes.wav");
let no = new Audio("samples/no.wav");

for (i=0; i<passLen; i++)
{
    if (pass.charAt(i) == " ") passHidden = passHidden + " ";
    else passHidden = passHidden + "-";
}

function writePass()
{
    document.getElementById("label").innerHTML = passHidden;
}

window.onload = start;

let letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function start()
{
    let divContent = "";

    for (i=0; i<35; i++)
    {
        var element = "lt" + i;
        divContent = divContent + '<div class="letter" onclick="checkNr(' + i + ')" id="' + element + '">' + letters[i] +'</div>';
        if ((i+1) % 7 == 0) divContent = divContent + '<div style="clear:both;"></div>';
    }

    document.getElementById("alphabet").innerHTML = divContent;

    writePass();
}

String.prototype.setSign = function(place, sign)
{
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + sign + this.substr(place + 1);
}

function checkNr(nr)
{
    let scored = false;

    for (i=0; i<passLen; i++)
    {
        if (pass.charAt(i) == letters[nr])
        {
            passHidden = passHidden.setSign(i, letters[nr]);
            scored = true;
        }
    }

    if (scored == true)
    {
        yes.play();
        var element = "lt" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        writePass();
    }
    else
    {
        no.play();
        var element = "lt" + nr;
        document.getElementById(element).style.background = "#300300";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");

        missedCount++;
        document.getElementById("hangman").innerHTML = '<img src="img/s' + missedCount + '.jpg" alt="" />'
    }

    if (pass == passHidden)
    document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: <br />" + pass + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';

    if (missedCount >= 9)
    document.getElementById("alphabet").innerHTML = "Przegrana! Prawidłowe hasło: <br/>" + pass + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}
