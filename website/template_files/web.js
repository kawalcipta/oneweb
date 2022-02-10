/* Write here your custom javascript codes */

var Datepicker = function () {

    return {
        //Datepickers
        initDatepicker: function () {
            // Regular datepicker
            $('#txtDate').datepicker({
                dateFormat: 'dd-mm-yy',
                prevText: '<i class="fa fa-angle-left"></i>',
                nextText: '<i class="fa fa-angle-right"></i>'
            });
        }

    };
}();


function loadMoreBerita(a) {

}

function clearsearch() {
    $('#divResultSearch').html('Silahkan lakukan pencarian form di atas. Isikan parameter pencarian dan klik tombol Submit ! ...            <p>               <i style="color: blue;">Please input parameters and then click the Search button! ..</i> </p>');
    $('#txtValSearch').val('');
}



$('#submitKurs').click(function (e) {
    var d = $('#date').val();
    $.ajax({
        type: 'post',
        url: 'kurs.html',
        dataType: 'text',
        data: {
            tglKurs: d,
            content: 'browseKurs'
        },
        success: function (response) {
            $("#resultKurs").html(response);

        },
        error: function () {
            $("#resultKurs").html("Not Found !!<br> Pencarian tidak ditemukan");
        }
    });
});

$('#clearKurs').click(function (e) {
    $("#date").val('');
    $("#resultKurs").html('');
});

$('#btnEmailRecovery').click(function (e) {
    if ($('#txtEmailPengadu').val() != '') {
        $.ajax({
            url: 'pengaduan.html',
            type: 'post',
            dataType: 'text',
            data: {
                content: 'recoveryEmail',
                txtEmailRecovery: $('#txtEmailPengadu').val()
            },
            success: function (response) {
                if (response == 'success') {
                    alert('Berhasil mengirimkan data tiket ke email !');
                } else {
                    alert('Gagal kirim email recovery tiket pengaduan ! :' + response);
                }
            }
        });
    } else {
        alert('Alamat email harus diisi dengan yang digunakan pada saat pengaduan !');
    }
});


$('#kirimPengaduan').click(function (e) {
    var txtUraianPengaduan = $('#uraian').val();
    var txtTerlapor = $('#terlapor').val();
    var txtNamaPengadu = $('#txtNamaPengadu').val();
    var txtAlamatPengadu = $('#txtAlamatPengadu').val();
    var txtEmailPengadu = $('#txtEmailPengadu').val();
    var txtTeleponPengadu = $('#txtTeleponPengadu').val();
    var txtJudulPengaduan = $('#txtJudulPengaduan').val();
    var txtKepadaPengaduan = $('#txtKepadaPengaduan').val();
    var txtLokasiPengaduan = $('#txtLokasiPengaduan').val();
    var txtKotaPengaduan = $('#txtKotaPengaduan').val();
    var txtWaktuKejadianUraian = $('#txtWaktuKejadianUraian').val();
    var txtWaktuKejadian = $('.txtTgl').val();
    var txtCaptcha = $('#txtCaptcha').val();

    var waktuKejadianIsi = false;
    if (txtWaktuKejadianUraian != '') {
        waktuKejadianIsi = true;
    }

    if (txtWaktuKejadian != '') {
        waktuKejadianIsi = true;
    }

    if (waktuKejadianIsi) {
        // validasi minimal karakter
        if (txtUraianPengaduan.length < parseInt('255') ||
                txtNamaPengadu != '' ||
                txtAlamatPengadu != '' ||
                txtJudulPengaduan != '' ||
                txtKepadaPengaduan != '' ||
                txtLokasiPengaduan != '' ||
                txtKotaPengaduan != '' ||
                txtTerlapor != '') {

            // validasi maksimal judul
            if (txtJudulPengaduan.length < parseInt('100')) {

                // validasi length nama pengadu
                if (txtNamaPengadu.length >= parseInt('3') && txtNamaPengadu.length <= parseInt('30')) {
                    $.ajax({
                        url: 'pengaduan.html',
                        type: 'post',
                        dataType: 'text',
                        data: {
                            content: 'sendPengaduan',
                            txtNamaPengadu: txtNamaPengadu,
                            txtAlamatPengadu: txtAlamatPengadu,
                            txtEmailPengadu: txtEmailPengadu,
                            txtTeleponPengadu: txtTeleponPengadu,
                            txtJudulPengaduan: txtJudulPengaduan,
                            txtKepadaPengaduan: txtKepadaPengaduan,
                            txtLokasiPengaduan: txtLokasiPengaduan,
                            txtKotaPengaduan: txtKotaPengaduan,
                            txtWaktuKejadian: txtWaktuKejadian,
                            txtWaktuKejadianUraian: txtWaktuKejadianUraian,
                            txtUraianPengaduan: txtUraianPengaduan,
                            txtTerlapor: txtTerlapor,
                            txtCaptcha: txtCaptcha
                        },
                        success: function (response) {
                            if (response.match('success') == 'success') {
                                alert('Pengaduan berhasil dikirim, silahkan gunakan nomor tiket untuk mengetahui proses tindak lanjutnya !');
                                $.ajax({
                                    url: 'pengaduan.html',
                                    type: 'post',
                                    dataType: 'text',
                                    data: {
                                        content: 'loadTiket',
                                        txtJudulPengaduan: txtJudulPengaduan,
                                        txtAlamatPengadu: txtAlamatPengadu,
                                        txtNamaPengadu: txtNamaPengadu
                                    }, success: function (response) {
                                        $('#contentPengaduan').html(response);

                                    }
                                });

                                $.ajax({
                                    url: 'pengaduan.html',
                                    type: 'post',
                                    dataType: 'text',
                                    data: {
                                        content: 'recoveryEmail',
                                        txtEmailRecovery: $('#txtEmailPengadu').val()
                                    }
                                });
                            } else {
                                alert('Data pengaduan tidak dapat dikirim, karena ' + response);
                            }
                        }
                    });
                } else {
                    alert('Nama pengadu minimal 3 dan maksimal 30 huruf !');
                }
            } else {
                alert('Judul pengaduan melebihi batas 100 huruf/karakter !');
            }
        } else {
            alert('Data isian pengaduan belum lengkap,' +
                    'Dan perhatikan untuk uraian pengaduan minimal 200 huruf/karakter');
        }
    } else {
        alert('Waktu pengaduan harus diisi salah satu yaitu uraian atau tanggalnya !');
    }
});

$('#txtLokasiPengaduan').change(function (e) {
    $.ajax({
        url: 'pengaduan.html',
        type: 'post',
        dataType: 'text',
        data: {
            content: 'loadKota',
            txtKdProvinsi: this.value
        },
        success: function (response) {
            $('#txtKotaPengaduan').html(response);
        }
    });
});

$('#btnTrackingPengaduan').click(function (e) {
    if ($('#txtNomorTiket').val() != '') {
        $('#responseTracking').html('<div class="contentRightTitle">TRACKING DATA PENGADUAN</div><div class="contentRightHeadLine">Loading data, please wait ! ...</div><div class="contentSeparator">&nbsp;</div>');
        $.ajax({
            url: 'pengaduan.html',
            type: 'post',
            dataType: 'text',
            data: {
                content: 'loadTiket',
                txtNomorTiket: $('#txtNomorTiket').val()
            },
            success: function (response) {
                $('#contentPengaduan').html(response);

            },
            error: function () {
                $('#responseTracking').html('<div class="alert alert-danger fade in"> Nomor tiket tidak ditemukan !!! </div>');
            }
        });
    } else {
        $('#responseTracking').html('<div class="alert alert-danger fade in"> Nomor tiket tidak boleh kosong !!! </div>');
        $('#txtNomorTiket').focus();
    }
});


var openWindow = function (url, wName, w, h) {
    var LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    var TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    var settings = 'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=yes,resizable'
    var win = window.open(url, wName, settings)
    return win;
}

$('#moreNews').click(function (e) {
    var paramNum = $('#paramNum').val();
//    alert(paramNum);
    $("#resultBerita").append('<div id="resultBerita' + paramNum + '"></div>');

    $.ajax({
        url: 'berita.html',
        type: 'post',
        dataType: 'text',
        data: {
            start: paramNum,
            content: 'nextNews'
        },
        success: function (response) {
            $("#resultBerita" + paramNum).html(response);
            var nextNum = parseFloat(paramNum) + 1;
            $('#paramNum').val(nextNum);

        },
        error: function () {
            $("#resultBerita" + paramNum).html("Error Load !!<br> Load Berita Ke Server Gagal....");
        }
    });

//   
});

$('#submitHS').click(function () {
    if ($('#txtParHS').val() == '' || $('#txtValHS').val() == '') {
        alert('Parameter tidak lengkap !');
    } else {
        $.ajax({
            url: 'btki.html',
            type: 'post',
            dataType: 'text',
            data: {
                txtParHS: $('#txtParHS').val(),
                txtValHS: $('#txtValHS').val()
            },
            success: function (response) {
                $("#divResultHS").html(response);
            },
            error: function () {
                $("#divResultHS").html("Error Load !!<br> Load HS Ke Server Gagal....");
            }

        });
    }
//   
});

$('#clearHS').click(function () {
    $('#divResultHS').html('Silahkan lakukan pencarian form di atas. Isikan parameter pencarian dan klik tombol Submit ! ...            <p>               <i style="color: blue;">Please input parameters and then click the Search button! ..</i> </p>');
    $('#txtParHS').val('');
    $('#txtValHS').val('');
});

$('#clearBK').click(function () {
    $('#divResultBK').html('Silahkan lakukan pencarian form di atas. Isikan parameter pencarian dan klik tombol Submit ! ...            <p>               <i style="color: blue;">Please input parameters and then click the Search button! ..</i> </p>');
    $('#txtNpwpPjt').val('');
    $('#txtNoBarang').val('');
});

$('#clearBKB').click(function () {
    $('#divResultBKB').html('Silahkan lakukan pencarian form di atas. Isikan parameter pencarian dan klik tombol Submit ! ...            <p>               <i style="color: blue;">Please input parameters and then click the Search button! ..</i> </p>');
    $('#txtNpwpPjt').val('');
    $('#txtNoBarang').val('');
});

var reloadCaptcha = function () {
    $('#txtCaptcha').val("");
    var obj = $('#image');
    var src2 = obj.attr("src");
    var pos = src2.indexOf('?');
    if (pos >= 0) {
        src2 = src2.substr(0, pos);
    }
    var date = new Date();
    obj.attr("src", src2 + '?v=' + date.getTime());
    return false;
};

$('#submitBK').click(function () {
    if ($('#txtNoBarang').val() == '') {
        alert('Parameter tidak lengkap !');
    } else if ($('#txtCaptcha').val() == '') {
        alert('Key code belum diisi ! ');
    } else {
        $('#infoBK').html('Loading...');
        $('#infoBK').css("display", "block");
        $('#accordion').html('');
        $('#resultBKNew').css("display", "none");
        $.ajax({
            url: 'barangkiriman.html',
            type: 'post',
            dataType: 'text',
            data: {
                txtCaptcha: $('#txtCaptcha').val(),
                txtNoBarang: $('#txtNoBarang').val().toUpperCase()
            },
            success: function (response) {
                populateTrackingResult(response);

            },
            error: function () {
                // $("#divResultBK").html("Error Load !!<br> Load HS Ke Server Gagal....");
                $("#divResultBK").html("Error Load !! Ke Server Gagal....");
            }

        });
    }
//   
});

$('#submitBKB').click(function () {
    if ($('#txtNoBarang').val() === '') {
        alert('Parameter tidak lengkap !');
    } else if ($('#txtCaptcha').val() === '') {
        alert('Key code belum diisi ! ');
    } else {
        $('#infoBKB').html('Loading...');
        $('#infoBKB').css("display", "block");
        $('#accordion').html('');
        $('#resultBKBNew').css("display", "none");
        $.ajax({
            url: 'barangkirimanbatam.html',
            type: 'post',
            dataType: 'text',
            data: {
                txtCaptcha: $('#txtCaptcha').val(),
                txtNoBarang: $('#txtNoBarang').val().toUpperCase()
            },
            success: function (response) {
                populateTrackingResultBKB(response);

            },
            error: function () {
                // $("#divResultBK").html("Error Load !!<br> Load HS Ke Server Gagal....");
                $("#divResultBKB").html("Error Load !! Ke Server Gagal....");
            }

        });
    }
//   
});

$('#btnSubmitPertanyaan').click(function () {
    if ($('#txtNamaPenanya').val() === '' ||
            $('#txtEmailPenanya').val() === '' ||
            $('#txtNoTelpPenanya').val() === '' ||
            $('#txtPertanyaan').val() === '') {
        alert('Parameter tidak lengkap !');
    } else if ($('#txtCaptcha').val() === '') {
        alert('Key code belum diisi ! ');
    } else {
        $.ajax({
            url: 'tanyabravo.html',
            type: 'post',
            dataType: 'text',
            data: {
                txtCaptcha: $('#txtCaptcha').val(),
                txtNamaPenanya: $('#txtNamaPenanya').val(),
                txtEmailPenanya: $('#txtEmailPenanya').val(),
                txtNoTelpPenanya: $('#txtNoTelpPenanya').val(),
                txtPertanyaan: $('#txtPertanyaan').val()
            },
            success: function (response) {
                alert('Pertanyaan ' + response + ' dikirim.');
                $('#txtNamaPenanya').val('');
                $('#txtEmailPenanya').val('');
                $('#txtNoTelpPenanya').val('');
                $('#txtPertanyaan').val('');
                $('#txtCaptcha').val('');
                location.reload();
            },
            error: function () {
                alert("Gagal mengirimkan pertanyaan !");
            }

        });
    }
});

function populateTrackingResult(response) {

    if (response.trim() != "wrongcaptcha") {
        $('#txtCaptcha').val('');
        reloadCaptcha();

        var res = JSON.parse(response);
        var success = res.success;

        if (success == "true") {
            var details = res.detail;
            var panelContainer = '';
            for (var i = 0; i < details.length; i++) {

                var barang = details[i].barang;
                var barangContainer = "";
                var trBarang = '';
                if (barang != undefined) {
                    for (var b = 0; b < barang.length; b++) {
                        trBarang += '<tr valign="top"><td>' + barang[b].hsCode + '</td><td>' + barang[b].seri + '</td><td>' + barang[b].lartas + '</td></tr>';
                    }
                    barangContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">INFORMASI BARANG</h3>'
                            + '</header><table class="table table-striped table-bordered">'
                            + '<tr valign="top"><th>Kode HS</th>'
                            + '<th>Seri</th>'
                            + '<th>Lartas</th>'
                            + '</tr>'
                            + trBarang
                            + '</table>';
                }

                var billing = details[i].detilbilling;

                var divBilling = '';
                var billingContainer = '';
                if (billing != undefined) {
                    for (var x = 0; x < billing.length; x++) {
                        divBilling += '<tr valign="top"><td>' + billing[x].akun + '</td><td>' + billing[x].jumlah + '</td></tr>';
                    }

                    billingContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">TAGIHAN BILLING</h3>'
                            + '</header><table class="table table-striped table-bordered">'
                            + '<tr valign="top"><td>KODE BILLING</td><td>' + details[i].kodeBilling + '</td></tr>'
                            + '<tr valign="top"><td>TOTAL BILLING</td><td>' + details[i].totaleBilling + '</td></tr>'
                            + divBilling
                            + '</table>';
                } else {
                    billingContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">TAGIHAN BILLING - TIDAK DITEMUKAN</h3> </header>';
                }


                var status = details[i].status;
                var divStatus = '';
                var statusContainer = '';
                if (status != undefined) {

                    for (var j = 0; j < status.length; j++) {
                        divStatus += '<tr valign="top"><td>' + status[j].wk + '</td><td>' + status[j].kode + '</td><td>' + status[j].ket + '</td></tr>';
                    }

                    var statusContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">HISTORY STATUS</h3>'
                            + '</header>'
                            + '<table class="table table-striped table-bordered">'
                            + divStatus
                            + '</table>';
                }

                var trackingContainer = '<table class="table table-striped table-bordered">'
                        + '<tr valign="top">'
                        + '<td>Pemberitahu</td><td>' + details[i].namaPemberitahu + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td>Penerima</td><td>' + details[i].namapenerima + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td>Pengirim</td><td>' + details[i].namapengirim + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td colspan="2">'
                        + '<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree' + i + '" class="buttoncel collapsed">'
                        + '<button class="btn-u btn-u-green col col-2"  style="float:right;"><i class="iconcl fa  fa-chevron-circle-down"></i> <span class="txclass">See Details</span></button>  '
                        + '</a>'
                        + '</td>'
                        + '</tr>'
                        + '</table>';

                var infoNoBarangContainer = '<header style="padding: 5px 15px">'
                        + '<h3 class="panel-title">INFORMASI NOMOR BARANG</h3>'
                        + '</header>'
                        + '<table class="table table-striped table-bordered">'
                        + '<tr valign="top">'
                        + '<td style="width:30%;">No Barang/AWB/Resi</td><td>' + details[i].noHouseAwb + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td>Tgl AWB</td><td>' + details[i].tglHouseAwb + '</td>'
                        + '</tr>'
                        + '</table>'

                //var collapseClass = (details.length==1) ? "collapse in" : "collapse" ;
                panelContainer += '   <div class="panel panel-default">'
                        + '<div class="panel-heading" style="background-color: #fcfcfc; padding: 0;">'
                        + trackingContainer
                        + '</div>'
                        + ' <div id="collapseThree' + i + '" class="panel-collapse collapse">'
                        + '<div class="panel-body" style="padding:0;">'
                        + infoNoBarangContainer
                        + barangContainer
                        + billingContainer
                        + statusContainer
                        + ' </div>'
                        + ' </div>'
                        + ' </div>';

            }

            //console.log('mypanecontainer'+panelContainer);
            $('#accordion').html(panelContainer);
            $('#infoBK').css("display", "none");
            $('#resultBKNew').css("display", "block");

        } else {
            $('#resultBKNew').css("display", "none");
            $('#infoBK').css("display", "block");
            $("#infoBK").html("Hasil Pencarian : " + res.message);
        }

    } else {
        $('#resultBKNew').css("display", "none");
        $('#infoBK').css("display", "block");
        $("#infoBK").html("<div style=\"color:red\"> Pengisian key code tidak sesuai ! </div>");
    }

}

function populateTrackingResultBKB(response) {
    if (response.trim() !== "wrongcaptcha") {
        $('#txtCaptcha').val('');
        reloadCaptcha();
        var res = JSON.parse(response);
        var success = res.success;
        if (success === "true") {
            var details = res.detail;
            var panelContainer = '';
            for (var i = 0; i < details.length; i++) {
                var barang = details[i].barang;
                var barangContainer = "";
                var trBarang = '';
                if (barang !== undefined) {
                    for (var b = 0; b < barang.length; b++) {
                        trBarang += '<tr valign="top"><td>' + barang[b].hsCode + '</td><td>' + barang[b].seri + '</td><td>' + barang[b].lartas + '</td></tr>';
                    }
                    barangContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">INFORMASI BARANG</h3>'
                            + '</header><table class="table table-striped table-bordered">'
                            + '<tr valign="top"><th>Kode HS</th>'
                            + '<th>Seri</th>'
                            + '<th>Lartas</th>'
                            + '</tr>'
                            + trBarang
                            + '</table>';
                }

                var billing = details[i].detilbilling;
                var divBilling = '';
                var billingContainer = '';
                if (billing !== undefined) {
                    for (var x = 0; x < billing.length; x++) {
                        divBilling += '<tr valign="top"><td>' + billing[x].akun + '</td><td>' + billing[x].jumlah + '</td></tr>';
                    }

                    billingContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">TAGIHAN BILLING</h3>'
                            + '</header><table class="table table-striped table-bordered">'
                            + '<tr valign="top"><td>KODE BILLING</td><td>' + details[i].kodeBilling + '</td></tr>'
                            + '<tr valign="top"><td>TOTAL BILLING</td><td>' + details[i].totaleBilling + '</td></tr>'
                            + divBilling
                            + '</table>';
                } else {
                    billingContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">TAGIHAN BILLING - TIDAK DITEMUKAN</h3> </header>';
                }

                var status = details[i].status;
                var divStatus = '';
                var statusContainer = '';
                if (status !== undefined) {

                    for (var j = 0; j < status.length; j++) {
                        divStatus += '<tr valign="top"><td>' + status[j].wk + '</td><td>' + status[j].kode + '</td><td>' + status[j].ket + '</td></tr>';
                    }

                    var statusContainer = '<header style="padding: 5px 15px">'
                            + '<h3 class="panel-title">HISTORY STATUS</h3>'
                            + '</header>'
                            + '<table class="table table-striped table-bordered">'
                            + divStatus
                            + '</table>';
                }

                var trackingContainer = '<table class="table table-striped table-bordered">'
                        + '<tr valign="top">'
                        + '<td>Pemberitahu</td><td>' + details[i].namaPemberitahu + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td>Penerima</td><td>' + details[i].namapenerima + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td>Pengirim</td><td>' + details[i].namapengirim + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td colspan="2">'
                        + '<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree' + i + '" class="buttoncel collapsed">'
                        + '<button class="btn-u btn-u-green col col-2"  style="float:right;"><i class="iconcl fa  fa-chevron-circle-down"></i> <span class="txclass">See Details</span></button>  '
                        + '</a>'
                        + '</td>'
                        + '</tr>'
                        + '</table>';

                var infoNoBarangContainer = '<header style="padding: 5px 15px">'
                        + '<h3 class="panel-title">INFORMASI NOMOR BARANG</h3>'
                        + '</header>'
                        + '<table class="table table-striped table-bordered">'
                        + '<tr valign="top">'
                        + '<td style="width:30%;">No Barang/AWB/Resi</td><td>' + details[i].noHouseAwb + '</td>'
                        + '</tr>'
                        + '<tr valign="top">'
                        + '<td>Tgl AWB</td><td>' + details[i].tglHouseAwb + '</td>'
                        + '</tr>'
                        + '</table>';

                //var collapseClass = (details.length==1) ? "collapse in" : "collapse" ;
                panelContainer += '   <div class="panel panel-default">'
                        + '<div class="panel-heading" style="background-color: #fcfcfc; padding: 0;">'
                        + trackingContainer
                        + '</div>'
                        + ' <div id="collapseThree' + i + '" class="panel-collapse collapse">'
                        + '<div class="panel-body" style="padding:0;">'
                        + infoNoBarangContainer
                        + barangContainer
                        + billingContainer
                        + statusContainer
                        + ' </div>'
                        + ' </div>'
                        + ' </div>';
            }
            //console.log('mypanecontainer'+panelContainer);
            $('#accordion').html(panelContainer);
            $('#infoBKB').css("display", "none");
            $('#resultBKBNew').css("display", "block");
        } else {
            $('#resultBKBNew').css("display", "none");
            $('#infoBKB').css("display", "block");
            $("#infoBKB").html("Hasil Pencarian : " + res.message);
        }
    } else {
        $('#resultBKBNew').css("display", "none");
        $('#infoBKB').css("display", "block");
        $("#infoBKB").html("<div style=\"color:red\"> Pengisian key code tidak sesuai ! </div>");
    }
}

(function ($) {
    /**
     * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
     **/
    var launch = new Date(2019, 0, 1, 0, 0, 0);
    var extraTime = new Date(2019, 0, 14, 0, 0, 0);
    /**
     * The script
     **/
    var days = $('#days');
    var hours = $('#hours');
    var minutes = $('#minutes');
    var seconds = $('#seconds');

    setDate();
    function setDate() {
        var now = new Date();
        if (launch < now) {
            if (extraTime < now) {
                $('#counter-page').attr("style", "display: none");
            } else {
                $('#isi-page').html("<div class='title-v1'><h2>PDE Internet untuk Dokumen Impor dan Ekspor resmi dimandatorikan.</h2></div>");
                setTimeout(setDate, 1000);
            }
        } else {
            var s = (launch.getTime() - now.getTime()) / 1000;
            var d = Math.floor(s / 86400);
            days.html('<h1>' + d + '</h1><p>Day' + (d > 1 ? 's' : ''), '</p>');
            s -= d * 86400;

            var h = Math.floor(s / 3600);
            hours.html('<h1>' + h + '</h1><p>Hour' + (h > 1 ? 's' : ''), '</p>');
            s -= h * 3600;

            var m = Math.floor(s / 60);
            minutes.html('<h1>' + m + '</h1><p>Minute' + (m > 1 ? 's' : ''), '</p>');

            s = Math.floor(s - m * 60);
            seconds.html('<h1>' + s + '</h1><p>Second' + (s > 1 ? 's' : ''), '</p>');
            setTimeout(setDate, 1000);
        }
    }
})(jQuery);


$(document).ready(function () {
    $(".linkKanan a").click(function () {
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
            var g = $(this.hash);
            g = g.length && g || $("[name=" + this.hash.slice(1) + "]");
            if (g.length) {
                var h = g.offset().top;
                $("html,body").animate({scrollTop: h}, 1000);
                return false
            }
        }
    });
    $(".butop").hide();
    Datepicker.initDatepicker();
    $(document).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".butop").fadeIn()
        } else {
            $(".butop").fadeOut()
        }
    });
    $(".butop").click(function () {
        $("body,html").animate({scrollTop: 0}, 800);
        return false
    });
    $(".arrdown").click(function () {
        $(".headerInfo").slideToggle()
    });
    $(window).resize(function () {
        var g = $(window).width();
        if (g > 575 && $(".headerInfo").is(":hidden")) {
            $(".headerInfo").removeAttr("style")
        }
        if (g > 1199) {
            $(".menuMobile").removeClass("isOpen");
            $(".wrapperMain").removeClass("pushed");
            $(".icon").removeClass("active");
            $("body").removeClass("ovFlo")
        } else {
        }
    });
    $(".icon .hamburger").click(function () {
        $(".icon").toggleClass("active")
    });
    $(".hamburger").click(function () {
        $(".menuMobile").toggleClass("isOpen");
        $(".wrapperMain").toggleClass("pushed");
        $("body").toggleClass("ovFlo")
    });
    $(".openSubMenu").click(function () {
        $(this).next(".subMenuMobile").addClass("isOpen")
    });
    $(".sub2").click(function () {
        $(this).next(".subMenuMobile2").addClass("isOpen")
    });
    $(".closeSubMenu").click(function () {
        $(".subMenuMobile").removeClass("isOpen")
    });
    $(".closeSubMenu2").click(function () {
        $(".subMenuMobile2").removeClass("isOpen")
    });
    function e() {
        interval = setInterval(function () {
            c()
        }, 3000)
    }
    e();
    var a = $(".oob_sli ul li").length;
    var f = $(".oob_sli ul li").width();
    var d = $(".oob_sli ul li").height();
    var b = a * f;
    $(".oob_sli").css({width: f, height: d});
    $(".oob_sli ul").css({width: b, marginLeft: -f});
    $(".oob_sli ul li:last-child").prependTo(".oob_sli lu");
    function c() {
        $(".oob_sli ul").animate({left: -f}, 300, function () {
            $(".oob_sli ul li:first-child").appendTo(".oob_sli ul");
            $(".oob_sli ul").css("left", "")
        })
    }
});

function search() {
    var a = $("#txtValSearch").val();
    if (a.length < 3) {
        $("#divResultSearch").html("Parameter Pencarian Minimal 4 Karakter");
        $("#txtSearch").focus(true)
    } else {
        $.ajax({url: "http://www.beacukai.go.id/searching.html", type: "POST", dataType: "text", data: {txtPar: a}, success: function (b) {
                $("#divResultSearch").html(b)
            }, error: function () {
                $("#divResultSearch").html("Error Load !!<br> Pencarian Ke Server Gagal....")
            }})
    }
}
$("#txtSearching").keypress(function (b) {
    var a = (b.keyCode ? b.keyCode : b.which);
    if (a === 13) {
        var c = $("#txtSearching").val();
        if (c.length >= 3) {
            $.ajax({url: "http://www.beacukai.go.id/searching.html", type: "post", dataType: "text", data: {txtPar: c, par: "search"}, success: function (d) {
                    $("#txtSearching").val("");
                    $("#content").html(d);
                    $("#txtValSearch").val(c);
                    $.ajax({url: "http://www.beacukai.go.id/searching.html", type: "post", dataType: "text", data: {txtPar: c, txtUri: window.location.pathname}, success: function (e) {
                            $("#divResultSearch").html(e)
                        }, error: function () {
                            $("#divResultSearch").html("Error Load !!<br> Pencarian Ke Server Gagal....")
                        }})
                }, error: function () {
                    window.location.replace("http://www.beacukai.go.id")
                }})
        }
    }
});
$("#txtSearchMobile").keypress(function (b) {
    var a = (b.keyCode ? b.keyCode : b.which);
    if (a === 13) {
        var c = $("#txtSearchMobile").val();
        if (c.length >= 3) {
            $.ajax({url: "http://www.beacukai.go.id/searching.html", type: "post", dataType: "text", data: {txtPar: c, par: "search"}, success: function (d) {
                    $("#txtSearchMobile").val("");
                    $("#content").html(d);
                    $("#txtValSearch").val(c);
                    $.ajax({url: "http://www.beacukai.go.id/searching.html", type: "post", dataType: "text", data: {txtPar: c, txtUri: window.location.pathname}, success: function (e) {
                            $("#divResultSearch").html(e)
                        }, error: function () {
                            $("#divResultSearch").html("Error Load !!<br> Pencarian Ke Server Gagal....")
                        }})
                }, error: function () {
                    window.location.replace("http://www.beacukai.go.id")
                }})
        }
    }
});
$(document).on("click", '[data-toggle="lightbox"]', function (a) {
    a.preventDefault();
    $(this).ekkoLightbox({alwaysShowClose: true})
});
