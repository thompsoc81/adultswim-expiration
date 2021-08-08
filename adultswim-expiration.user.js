// ==UserScript==
// @name         Adultswim Expiration Notices
// @namespace    https://github.com/thompsoc81/adultswim-expiration
// @version      1.0
// @description  Add a visible indicator of when videos expire on [adultswim] pages.
// @author       https://www.github.com/thompsoc81
// @match        http://*.adultswim.com/videos/*
// @match        https://*.adultswim.com/videos/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// Videos on adultswim.com often have a metadata tag with an expiration date in the
// DOM that is sometimes visible on specific episode pages but not shown on the
// thumbnails.  This script just adds a small div between the thumbnail image and
// the title to make this visible to the user anywhere a thumbnail of the video
// is found on the site, such as on the overall season listing pages.  It also
// color-codes it based on how close the expiration is.

// Note that the expiration date are specified in UTC and this script does nothing
// to convert it to the user's local timezone.  The full timestamp is added as a
// hover tooltip on the div as it was found in the DOM (with " UTC" for clarity).

// The [as] website can be inconsistent with including the expiration metadata.
// Sometimes the page will load without these values inserted.  If this happens,
// reload the page a few times or try again later.

(function() {
    'use strict';

    // the cutoff values for the color warnings
    let red_days = 1;
    let orange_days = 3;
    let yellow_days = 7;
    let green_days = 31;

    // find all the video objects on the page
    //alert("Looking for vids...");
    var divs = document.getElementsByTagName("div");
    var video_divs = [];
    for (let i=0; i < divs.length; i++) {
        if (divs[i] != null) {
            let itemprop = divs[i].getAttribute("itemprop");
            if (itemprop != null && itemprop == "video") {
                video_divs.push(divs[i]);
            }
        }
    }

    // walk the list of found videos and annotate the ones expiring
    var expiring = [];
    for (let j=0; j < video_divs.length; j++) {
        var metas = video_divs[j].getElementsByTagName("meta");
        for (let k=0; k < metas.length; k++) {
            if (metas[k] != null) {
                let itemprop = metas[k].getAttribute("itemprop");
                if (itemprop != null && itemprop == "expires") {
                    // we have found a video with an expiration date tag
                    let expiration = metas[k].getAttribute("content");

                    // find the video title and insert a note above it
                    let h3 = video_divs[j].getElementsByTagName("h3");
                    if (h3[0] != null) {
                        // add the expiration to an overall summary list
                        let title = h3[0].getAttribute("title");
                        let e = "\n(" + title + ": " + expiration + ")";
                        expiring.push(e);

                        // determine how soon this expiration is (in days)
                        let tstamp_exp = Date.parse(expiration);
                        let remaining = ( tstamp_exp - Date.now() ) / 1000;
                        let days = remaining / 3600 / 24;

                        // create the visual expiration notice
                        let pad = "\u00A0\u00A0";
                        let exp = pad + expiration.split("T")[0] + pad;
                        let notice = document.createElement("h5");
                        let notice_span = document.createElement("span");
                        notice_span.appendChild(document.createTextNode(exp));
                        notice.appendChild(notice_span);
                        notice.setAttribute("title",expiration + " (UTC)");

                        // color the expiration depending on how soon it is
                        let expBgColor = null;
                        let expFgColor = null;
                        let textScale = "60%";

                        if (days <= red_days) {
                            expBgColor = "lightpink";
                            expFgColor = "crimson";
                            textScale = "90%";
                        }
                        else if (days <= orange_days) {
                            expBgColor = "peachpuff";
                            expFgColor = "coral";
                            textScale = "85%";
                        }
                        else if (days <= yellow_days) {
                            expBgColor = "lightgoldenrodyellow";
                            expFgColor = "darkgoldenrod";
                            textScale = "75%";
                        }
                        else if (days <= green_days) {
                            expBgColor = "lightseagreen";
                            expFgColor = "darkgreen";
                            textScale = "70%";
                        }

                        if (expBgColor != null) {
                            // apply visual priority colors to the notice
                            notice_span.style.backgroundColor = expBgColor;
                            notice_span.style.color = expFgColor;
                            notice_span.style.fontWeight = "800";
                        }
                        else {
                            // expiration is far away, so no need to highlight
                            notice_span.style.fontWeight = "bold";
                        }
                        notice_span.style.fontSize = textScale;

                        // insert the expiration note just before title
                        h3[0].parentElement.insertBefore(notice, h3[0]);
                    }
                }
            }
        }
    }

    //alert("Found " + video_divs.length + " videos!");
    //alert("Expring videos: " + expiring);
})();


// ==== Changelog ====
//
//   1.0  - add hover tooltip and comment code to prep for github release
//   0.1  - initial version, add expirations with colors to videos