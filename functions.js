function download(){
  var node = document.getElementById('cont');

  domtoimage.toPng(node)
      .then(function (dataUrl) {
          var img = new Image();
          // img.src = dataUrl;
          // document.body.appendChild(img);
          save(dataUrl);
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
}

function save (img) {
  var a = document.createElement('a');
  a.href = img;
  a.download = img;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function update () {
  var is_absolute = $("#is_absolute").is(':checked');
  var statsig = $("#customRange11").val()/100;
  var base = $("#baseline").val()/100;
  var mde = $("#mde").val()/100;
  mde = (is_absolute) ? mde : base*mde;

  // sample size
  var sample_size = calc(statsig, base, mde)
  $("#sample_size").text(Math.ceil(sample_size));

  // variants
  var variants = $("#variants").val();
  var total_sample_size = sample_size * variants;
  $("#total_sample_size").text(Math.ceil(total_sample_size));

  // traffic
  var traffic = $("#traffic").val();
  var days = total_sample_size / traffic * 7;
  var time = getWeeks(days);
  var weeks = (time.weeks > 0) ? Math.ceil(time.weeks) + " weeks and " : "";
  $("#time").text(weeks + Math.ceil(time.days) + " days");

  // range
  var min = Math.round((base - mde) * 100);
  var max = Math.round((base + mde) * 100);
  $("#bottom").text("< "+min+"%");
  $("#mid").text(min+"% - "+max+"%");
  $("#top").text("> "+max+"%");
  // $("#range").text(min+"% to "+max+"%");
}
