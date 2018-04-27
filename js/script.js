$(function () {
    startEmUp();

    $(window).on("unload", function (e) {
        updateUrl();
    });

    $(window).on('hashchange', function () {
        updateUrl();
    });
});

function startEmUp() {
    $.ajax({
        url: "api/index.php/startEmUp"
    }).done(function (data) {
        console.log(data);
        setSky();
        setNavbar();
        setManagementPages();
        reloadUpdate();
        initLogIn();
    })
}

function initLogIn() {
    $("#logInButton").click(function () {

        if ($("#logInUsername").val()) {
            var toSend = {};
            toSend.username = $("#logInUsername").val();

            $.ajax({
                type: "post",
                url: "api/index.php/login",
                data: JSON.stringify(toSend),
                dataType: "json"
            }).done(function (banana) {
                if (banana == true) {
                    console.log("Valid");
                    unhideNav();
                    window.location.hash = "profile";
                    updateUrl();
                } else {
                    console.log("Unvalid")
                }
            });
        }
    });

}

function reloadUpdate() {

    $.ajax({
        url: "api/index.php/loggedin"
    }).done(function (data) {
        console.log(data);
        if (data == 1) {
            if (window.location.hash == "" || window.location.hash == "#") {
                hideAllPages();
            } else {
                updateUrl()
            }
            unhideNav();
        } else {
            hideAllPages();
            window.location.hash = "";
        }
    })

}

function unhideNav() {
    $("#contentPanel").removeClass("hidden");
    $("#navbar").removeClass("hidden");
    $("#logIn").addClass("hidden");
}

function hideNav() {
    $("#contentPanel").addClass("hidden");
    $("#navbar").addClass("hidden");
    $("#logIn").removeClass("hidden");
}

function hideAllPages() {
    $("#contentPanelProfile").removeClass("hidden");
    $("#contentPanelSettings").removeClass("hidden");
    $("#contentPanelSearch").removeClass("hidden");
    $("#contentPanelDate").removeClass("hidden");
    $("#contentPanelManage").removeClass("hidden");
    $("#editEmployeePage").removeClass("hidden");

    $("#contentPanelProfile").addClass("hidden");
    $("#contentPanelSettings").addClass("hidden");
    $("#contentPanelSearch").addClass("hidden");
    $("#contentPanelDate").addClass("hidden");
    $("#contentPanelManage").addClass("hidden");
    $("#editEmployeePage").addClass("hidden");
}

function setNavbar() {
    $("#navbarManage").click(function () {
        window.location.hash = "manage";
        updateUrl();
    });
    $("#navbarSearch").click(function () {
        window.location.hash = "search";
        updateUrl();
    });
    $("#navbarProfile").click(function () {
        window.location.hash = "profile";
        updateUrl();
    });
    $("#navbarSetting").click(function () {
        window.location.hash = "setting";
        updateUrl();
    });
    $("#navbarLogOut").click(function () {
        logout();
    });
}

function setManagementPages() {
    $("#getSalesReportButton").click(function () {
        window.location.hash = "getSalesReport";
        updateUrl();
    });
    $("#listAllUsersButton").click(function () {
        window.location.hash = "listAllUsers";
        updateUrl();
    });
    $("#searchEmployeeButton").click(function () {
        window.location.hash = "searchEmployee";
        updateUrl();
    });
    $("#searchDateButton").click(function () {
        window.location.hash = "searchDate";
        updateUrl();
    });
    $("#searchRevenueGeneratedButton").click(function () {
        window.location.hash = "searchRevenueGenerated";
        updateUrl();
    });
    $("#employeeMostRevenueButton").click(function () {
        window.location.hash = "employeeMostRevenue";
        updateUrl();
    });
    $("#peopleWhoHaveGoneOutWithButton").click(function () {
        window.location.hash = "peopleWhoHaveGoneOutWith";
        updateUrl();
    });
}


function logout() {
    $.ajax({
        url: "api/index.php/logout"
    }).done(function (data) {
        hideNav();
        reloadUpdate();
    })
}

function updateUrl() {
    var hash = window.location.hash;
    var parse = hash.split("-");
    hideAllPages();
    switch (parse[0]) {
        case "#manage":
            $("#contentPanelManage").removeClass("hidden");
            break;
        case "#search":
            searchProf(parse);
            $("#contentPanelSearch").removeClass("hidden");
            break;
        case "#date":
            $("#contentPanelDate").removeClass("hidden");
            break;
        case "#setting":
            $("#contentPanelSettings").removeClass("hidden")
            break;
        case "#editEmployeePage":
            $("#editEmployeePage").removeClass("hidden");
            break;
        case "#getSalesReport":
            $("#getSalesReport").removeClass("hidden");
            break;
        case "#listAllUsers":
            $("#listAllUsers").removeClass("hidden");
            break;
        case "#searchEmployee":
            $("#editEmployeePage").removeClass("hidden");
            break;
        case "#searchDate":
            $("#searchDate").removeClass("hidden");
            break;
        case "#searchRevenueGenerated":
            $("#searchRevenueGenerated").removeClass("hidden");
            break;
        case "#employeeMostRevenue":
            $("#employeeMostRevenue").removeClass("hidden");
            break;
        case "#peopleWhoHaveGoneOutWith":
            $("#peopleWhoHaveGoneOutWith").removeClass("hidden");
            break;
        case "#profile":
            if (parse[1]) {
                loadProfile(parse[1])
            } else {
                loadProfile("me");
            }
            break;
        default:
            break;
    }
}

function setSky() {
    $("#content").addClass("sky-gradient-" + new Date().getHours());
    window.setTimeout(function () {
        setSky();
    }, 6000);
}
