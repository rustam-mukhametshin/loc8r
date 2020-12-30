/**
 * Validate review form
 */
$('#addReview').on('submit', function (e) {
    let $alert = $('.alert.alert-danger');
    $alert.hide();
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
        if ($alert.length) {
            $alert.show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>');
        }
        return false;
    }
});