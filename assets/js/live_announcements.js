// Note that all functions/variables need to be wrapped in the callback in order to avoid
// redefinitions when the user navigates around (caused by re-injections into the DOM).

jQuery(document).ready(async function ($) {

    /* Globals */

    let announcements = [];
    let updateDataTimeout;

    /* Main */

    $.noConflict();
    initTicker();
    await updateData();

    /* UI Functions */

    function initTicker() {
        $("#announcements").eocjsNewsticker({
            type: 'dynamic',
            divider: '—',
            speed: 10,
            interval: 1,
            getContentArray: getAnnouncements,
        });
    }

    function getAnnouncements() {
        if (announcements.length === 0) {
            $("#announcements").animate({ height: 0 });
            return [' '];
        }

        $("#announcements").animate({ height: '1.2em' })
        return announcements;
    }

    function displayError() {
        $("#announcements").fadeOut().promise().done(() => {
            $("#error").fadeIn();
        });
    }

    /* Data Loading Functions */

    function transformData(data) {
        if (!data.values) {
            return [];
        }

        const anns = data.values
            .slice(1) // skip header row
            .flat(2);

        return anns.map((ann, i) => {
            return `${i + 1}/${anns.length}: ${ann}`
        });
    }

    async function updateData() {
        // Stop refreshing when the user navigates to a different page
        if (!$('#announcements').length) {
            clearTimeout(updateDataTimeout)
            return;
        }

        try {
            let response = await fetch(announcementsUrl);
            if (!response.ok) {
                throw response.status;
            }
            let data = await response.json();

            // Update the variable, the newsticker will pick it up from there
            announcements = transformData(data)

            updateDataTimeout = setTimeout(updateData, 5_000);
        } catch (err) {
            console.error(err);
            displayError();
        }
    }
});
