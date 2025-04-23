jQuery(document).ready(async function ($) {

    /* Globals */

    let faqs = [];
    let updateDataTimeout;

    /* Main */

    $.noConflict();
    await updateData();

    /* UI Functions */

    function displayError() {
        $(".status").fadeOut().promise().done(() => {
            $("#error").fadeIn();
        });
    }

    function setFaqs(faqs) {
        function getElement(faq) {
            return `
            <div class="item clearfix">
                <div class="heading">
                    <div class="e-title col-md-12 col-sm-12 col-xs-12">${faq.question}<br></div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="content details col-md-12 col-sm-12 col-xs-12">
                        ${faq.answer || ''}
                    </div>
                </div>
            </div>`
        }

        $(".status").fadeOut();

        const accordion = $('#faqAccordion')
        accordion.fadeOut().promise().done(() => {
            accordion.empty()
            faqs.forEach(faq => {
                accordion.append(getElement(faq))
            })

            /*******Schedule Accordion *************/
            $('.accordion .item .heading').click(function () {
                var a = $(this).closest('.item');
                var b = $(a).hasClass('open');
                var c = $(a).closest('.accordion').find('.open');

                if (b != true) {
                    $(c).find('.content').slideUp(500);
                    $(c).removeClass('open');
                }

                $(a).toggleClass('open');
                $(a).find('.content').slideToggle(500);

            });

            accordion.fadeIn()
        })
    }

    /* Data Loading Functions */

    function transformData(data) {
        if (!data.values) {
            return [];
        }
        return data.values
            .slice(1) // skip header row
            .map((faq, _i) => {
                return { question: faq[0], answer: faq[1] };
            });
    }

    async function updateData() {
        // Stop refreshing when the user navigates to a different page
        if (!$('#faqAccordion').length) {
            clearTimeout(updateDataTimeout)
            return;
        }


        try {
            let response = await fetch(faqUrl);
            if (!response.ok) {
                throw response.status;
            }
            let data = await response.json();

            const newFaqs = transformData(data);

            if (JSON.stringify(faqs) !== JSON.stringify(newFaqs)) {
                faqs = newFaqs
                setFaqs(faqs)
            }

            updateDataTimeout = setTimeout(updateData, 5_000);
        } catch (err) {
            console.error(err);
            displayError();
        }
    }

});
