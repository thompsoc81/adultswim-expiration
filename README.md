# [adultswim] Expiration Notices
___This [Tampermonkey](https://tampermonkey.net) script adds expiration dates to most of the video thumbnails posted to [adultswim.com](https://adultswim.com).___

&nbsp;

While the [adultswim] website often shows the expiration dates in the description area of individual episode pages, it does not display them on thumbnails such as those found on the overall show listing pages.  This metadata is usually include in the page DOM, though.  This script simply looks for these hidden timestamps and adds a tag above the episode title.

&nbsp;

![Example expiration labels added to an adultswim.com listing](example_expiration_label.png)  
*An example of expiration labels added to an [adultswim] listing by this script*

&nbsp;

![Example tags for a video thumbnail on aduiltswim.com showing the expiration metadata](hidden_expiration_metadata.png)  
*Example tags for a video thumbnail on the [adultswim] website showing the hidden expiration metadata*

&nbsp;

---

## Installation

This script can be installed easily by first adding the [Tampermonkey](https://tampermonkey.net) addon to a web browser and then visiting this direct link to the script file:

[https://github.com/thompsoc81/adultswim-expiration/raw/main/adultswim-expiration.user.js](https://github.com/thompsoc81/adultswim-expiration/raw/main/adultswim-expiration.user.js)

The Tampermonkey extension should intercept the link opening and ask if it should install the script.  If it does not do this, open the extension's Dashboard page and add this script manually.  That's it!

While this script was designed and tested with Tampermonkey in Chrome, it may work (or with only slight modification) within the original user script extension, [Greasemonkey](https://greasespot.net).  This has not bee tested, but this script is not ocmplex nor using any arcane features.  It likely is compatible.
