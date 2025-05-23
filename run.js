// ==UserScript==
// @name         Facebook - Hide Like Buttons (Observer)
// @namespace    http://tampermonkey.net/
// @version      0.0.9
// @description  Ẩn các nút Like trên Facebook kể cả khi trang cuộn xuống hoặc load thêm nội dung mới
// @author       Spycio.Kon
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Hàm ẩn tất cả nút Like tìm được
    function hideLikeButtons() {
        const likeSpans = document.querySelectorAll('span[data-ad-rendering-role="like_button"]');
        likeSpans.forEach(span => {
            const button = span.closest('div[role="button"]');
            if (button) {
                button.style.display = 'none';
            }
        });
    }

    // Gọi lần đầu khi trang vừa load
    hideLikeButtons();

    // Theo dõi thay đổi trong toàn bộ body
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                hideLikeButtons();
                break;
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
