function prepare_for_download(){
  $("#cont").removeClass("container");
  $("#cont").addClass("bg-white");
  $("#cont").addClass("p-4");
}
function reset_default(){
  $("#cont").addClass("container");
  $("#cont").removeClass("bg-light");
  $("#cont").removeClass("p-4");
}
function download(){
  prepare_for_download();
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
  reset_default();
}
function update () {
  var is_absolute = $("#is_absolute").is(':checked');
  var statsig = $("#statsig").val()/100;
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

  // statsig
  const $valueSpan = $('.valueSpan2');
  const $value = $('#statsig');
  $valueSpan.html($value.val()+"%");
}

function set_init_values(){
  $("#variants").val(2);
  $("#traffic").val(5000);
  $("#baseline").val(20);
  $("#mde").val(5);
  $("#statsig").val(90);
}

$(document).ready(function() {
  set_init_values();
  update();
});
$("input").on("input change", (e) => {
  update();
});
$("#download").click(function(){
  download();
})
