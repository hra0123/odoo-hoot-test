import { expect, test } from "@odoo/hoot";
import { startInteractions, setupInteractionWhiteList } from "@web/../tests/public/helpers";
import { click, queryFirst } from "@odoo/hoot-dom";


const formTemplate = /* html */  `
    <div id="wrapwrap">
        <section class="s_website_form pt16 pb16" data-vcss="001" data-snippet="s_website_form" data-name="Form">
            <div class="container-fluid">
                <form action="/website/form/" method="post" enctype="multipart/form-data" class="o_mark_required" data-mark="*" data-pre-fill="true" data-model_name="mail.mail" data-success-mode="redirect" data-success-page="/contactus-thank-you">
                    <div class="s_website_form_rows row s_col_no_bgcolor">
                        <div data-name="Field" class="s_website_form_field mb-3 col-12 s_website_form_custom s_website_form_required" data-type="char">
                            <div class="row s_col_no_resize s_col_no_bgcolor">
                                <label class="col-form-label col-sm-auto s_website_form_label" style="width: 200px" for="obij2aulqyau">
                                    <span class="s_website_form_label_content">Your Name</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="col-sm">
                                    <input class="form-control s_website_form_input o_translatable_attribute" type="text" name="name" required="1" data-fill-with="name" id="obij2aulqyau"/>
                                </div>
                            </div>
                        </div>
                        <div data-name="Field" class="s_website_form_field mb-3 col-12 s_website_form_model_required" data-type="email">
                            <div class="row s_col_no_resize s_col_no_bgcolor">
                                <label class="col-form-label col-sm-auto s_website_form_label" style="width: 200px" for="oub62hlfgjwf">
                                    <span class="s_website_form_label_content">Your Email</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="col-sm">
                                    <input class="form-control s_website_form_input o_translatable_attribute" type="email" name="email_from" required="" data-fill-with="email" id="oub62hlfgjwf"/>
                                </div>
                            </div>
                        </div>
                        <div data-name="Field" class="s_website_form_field mb-3 col-12 s_website_form_model_required s_website_form_field_hidden_if d-none" data-type="char" data-visibility-dependency="email_from" data-visibility-comparator="set">
                            <div class="row s_col_no_resize s_col_no_bgcolor">
                                <label class="col-form-label col-sm-auto s_website_form_label" style="width: 200px" for="oqsf4m51acj">
                                    <span class="s_website_form_label_content">Subject</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="col-sm">
                                    <input class="form-control s_website_form_input o_translatable_attribute" type="text" name="subject" required="" id="oqsf4m51acj"/>
                                </div>
                            </div>
                        </div>
                        <div data-name="Field" class="s_website_form_field mb-3 col-12 s_website_form_custom s_website_form_required s_website_form_field_hidden_if d-none" data-type="text" data-visibility-dependency="subject" data-visibility-comparator="set">
                            <div class="row s_col_no_resize s_col_no_bgcolor">
                                <label class="col-form-label col-sm-auto s_website_form_label" style="width: 200px" for="oyeqnysxh10b">
                                    <span class="s_website_form_label_content">Your Question</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="col-sm">
                                    <textarea class="form-control s_website_form_input o_translatable_text" name="description" required="1" id="oyeqnysxh10b" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div data-name="Field" class="s_website_form_field mb-3 col-12 s_website_form_dnone">
                            <div class="row s_col_no_resize s_col_no_bgcolor">
                                <label class="col-form-label col-sm-auto s_website_form_label" style="width: 200px">
                                    <span class="s_website_form_label_content"/>
                                </label>
                                <div class="col-sm">
                                    <input type="hidden" class="form-control s_website_form_input o_translatable_attribute" name="email_to" value="info@yourcompany.example.com"/>
                                </div>
                            </div>
                        </div>
                        <div class="mb-0 py-2 col-12 s_website_form_submit text-end s_website_form_no_submit_label" data-name="Submit Button">
                            <div style="width: 200px;" class="s_website_form_label"></div>
                            <span id="s_website_form_result"></span>
                            <a href="#" role="button" class="btn btn-primary s_website_form_send">Submit</a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
`;
setupInteractionWhiteList("website.form");


test("empty form should not be submitted", async () => {

    //load the form in view
    const { core } = await startInteractions(formTemplate);
    expect(core.interactions).toHaveLength(1);

    await click("a.s_website_form_send");

    expect("#s_website_form_result:contains('Please fill in the form correctly')").toHaveCount(1);


    expect("input[name='subject']").toHaveClass("is-invalid", {
        message: "Empty 'subject' field should have been highlighted"
    })

    expect("input[name='email_from']").toHaveClass("is-invalid", {
        message: "Empty 'email' field should have been highlighted"
    })

     expect("textarea[name='description']").toHaveClass("is-invalid", {
         message: "Empty 'Your Question' field should have been highlighted"
     })

});
