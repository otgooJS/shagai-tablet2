//Тоглогчийн ээлж, нийт оноо, ээлжийн оноонуудыг хадгалах хувьсагчууд
var activePlayer, scores, roundScore;

var positionLeft; //Морьны сүүлийн байрлалыг хадгалах хувьсагч

//Вэб хуудас гарч ирэхэд автоматаар Тоглоомыг шинээр эхлүүлэх функц
initGame();

function initGame() {
  //Тоглогчдын цуглуулсан нийт оноог хадгалах хувьсагч
  scores = [0, 0];

  //Тоглогчдын ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  //Морьны сүүлийн байрлалыг хадгалах хувьсагч
  // Margin left of Race line=11, Margin left of Horse 0 position=9
  positionLeft = [17, 17];

  //Программ эхлэхэд бэлтгэе!

  //Яллаа гэдэг мэдээллийг алга болгож тоглогчдын нэрийг анхны хэлбэрт нь авчрах
  document.getElementById("player-0").textContent = "1-Р ТОГЛОГЧ";
  document.getElementById("player-1").textContent = "2-Р ТОГЛОГЧ";

  //УЛААН өнгөний CLASS-ийг авч хаях
  document.getElementById("player-0").classList.remove("active");
  document.getElementById("player-1").classList.remove("active");

  //Дөрвөн шагайны зургаа оруулах
  for (var x = 1; x < 5; x++) {
    document.getElementById(`bone-${x}`).src = `/img/${x}_shagai.jpg`;
  }

  //ШАГАЙ ХАЯХ ТОВЧ-нууд идэвхитэй байх ёстой
  document.getElementById("btn-0").disabled = false;
  document.getElementById("btn-1").disabled = false;
  document.getElementById("btn-start").disabled = true;

  //Уралдах 2 морьны зургийг оруулах!!!!!******************* ??????????
  document.getElementById("0-0").src = `/img/HORSE-0.png`;
  document.getElementById("1-0").src = `/img/HORSE-1.png`;

  //Морьдыг гарааны байрлалд байрлуулах
  document.getElementById(`0-0`).style.marginLeft = "17px";
  document.getElementById(`1-0`).style.marginLeft = "17px";
}

// ************* ШАГАЙ ОРХИХ ТОВЧ **************

function shagaiRoll(player) {
  activePlayer = player;
  //ДАРАГДСАН ТОВЧ-ийг идэвхигүй болгож, нөгөө тоглогчийн ТОВЧ-г идэвхитэй болгох
  if (activePlayer === 0) {
    document.getElementById("btn-0").disabled = true;
    document.getElementById("btn-1").disabled = false;
  } else {
    document.getElementById("btn-0").disabled = false;
    document.getElementById("btn-1").disabled = true;
  }

  for (var x = 0; x < 4; x++) {
    var boneNr = Math.ceil(Math.random() * 4);
    //Санамсаргүй тоонд харгалзуулан шагайны зургийг оруулах
    document.getElementById(`bone-${x + 1}`).src = `/img/${boneNr}_shagai.jpg`;
    console.log(boneNr);

    //Нийт хэдэн морь буусныг олох
    if (boneNr === 1) {
      roundScore = roundScore + 1;
    }
  }
  console.log("roundScore=" + roundScore);

  //НИЙТ ОНОО
  scores[activePlayer] = scores[activePlayer] + roundScore;
  console.log(`${activePlayer}-р тоглогчийн НИЙТ ОНОО+${scores[activePlayer]}`);

  //width of horse img =52.09;
  positionLeft[activePlayer] = positionLeft[activePlayer] + 52.09 * roundScore;
  console.log("positionLeft=" + positionLeft[activePlayer]);

  // ************* МОРЬ УРАГШЛУУЛАХЫН ТУЛД **************

  const positionLeftFinal = 937;

  if (positionLeft[activePlayer] >= positionLeftFinal) {
    document.getElementById(
      `${activePlayer}-0`
    ).style.marginLeft = `${positionLeftFinal}px`;

    //Тоглогч яллаа гэсэн бичгийг УЛААНААР гаргах
    document.getElementById(`player-${activePlayer}`).textContent = `ТОГЛОГЧ ${
      activePlayer + 1
    } ЯЛЛАА!!`;

    document.getElementById(`player-${activePlayer}`).classList.add("active");

    document.getElementById("btn-0").disabled = true;
    document.getElementById("btn-1").disabled = true;
    document.getElementById("btn-start").disabled = false;
  } else {
    //***************** МОРИО УРАГШЛУУЛАХ *********************

    document.getElementById(
      `${activePlayer}-0`
    ).style.marginLeft = `${positionLeft[activePlayer]}px`;

    roundScore = 0;
    console.log("roundScore=" + roundScore);
  }
}
