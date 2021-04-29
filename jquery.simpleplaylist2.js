/*
 * SimplePlaylist - A jQuery Plugin
 * @requires jQuery v1.4.0 or later
 *
 * SimplePlaylist is a html5 multitrack audio player
 * forked from http://github.com/yuanhao/Simple-Player
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2012, Zakhar Day (zakhar.day -[at]- gmail [*dot*] com)
 */
(function ($) {
  $.fn.playlist2 = function () {
    var progressBar2Block = '<div class="progressBar2">' + '<div class="progress2"></div>' + "</div>";

    function stopAudio(audio) {
      $(".playing").removeClass("playing");
      $(".progressBar2").remove();
      $(".minus").fadeOut("fast");
      audio.pause();
      audio.currentTime = 0;
    }

    this.find("li").each(function () {
      var audio = $(this).find("audio").get(0),
        button = $(this).find("#playToggle"),
        minus = $(this).find(".minus"),
        timeleft = $(this).find("#timeleft");

      $(audio)
        .bind("play", function () {
          $(audio).before(progressBar2Block);
          $(button).addClass("playing");
          $(minus).fadeIn("fast");

          var progressBar2 = $(".progressBar2"),
            progress2 = $(".progress2");

          $(audio).bind("timeupdate", function (e) {
            var rem = parseInt(this.duration - this.currentTime, 10),
              pos = (this.currentTime / this.duration) * 100,
              mins = Math.floor(rem / 60, 10),
              secs = rem - mins * 60;

            $(timeleft).text(mins + ":" + (secs > 9 ? secs : "0" + secs));
            $(progress2).css("width", pos + "%");
          });

          $(progressBar2).click(function (e) {
            if (audio.duration != 0) {
              left = $(this).offset().left;
              offset = e.pageX - left;
              percent = offset / progressBar2.width();
              duration_seek = percent * audio.duration;
              audio.currentTime = duration_seek;
            }
          });
        })
        .bind("pause", function () {
          stopAudio(audio);
        });

      $(audio).bind("ended", function () {
        var nextTrack = $(audio).parent().next("li").find("audio").get(0);
        stopAudio(audio);

        if (nextTrack) {
          nextTrack.play();
        }
      });

      button.click(function () {
        if (audio.paused) {
          if ($(".playing").length) {
            playing = $(".playing").parents("li").find("audio").get(0);
            stopAudio(playing);
          }
          audio.play();
        } else {
          audio.pause();
        }
      });
    });
  };
})(jQuery);
