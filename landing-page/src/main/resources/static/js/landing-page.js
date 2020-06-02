var ghdUrl = 'http://125.212.226.73:9006';
var numberView = 0;
var numberClick = 0;
var sessionId = null;
var typeMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

(function (funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }
    baseObj[funcName] = function (callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        if (readyFired) {
            setTimeout(function () {
                callback(context);
            }, 1);
            return;
        } else {
            readyList.push({
                fn: callback,
                ctx: context
            });
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);

window.docReady(function () {
    if (numberView == 0 && !isNullOrUndefined(tag)) {
        viewPage();
        numberView++;
    }
    document.body.addEventListener('click', function () {
        if (numberClick == 0 && !isNullOrUndefined(tag)) {
            clickPage();
            numberClick++;
        }
    });
});

function isNullOrUndefined(data) {
    return (data === null || typeof data == undefined);
}

function isNull(data) {
    return (data === null);
}

function isUndefined(data) {
    return (typeof data == undefined);
}

function isFunction(data) {
    return data && {}.toString.call(data) === '[object Function]';
}

function sendData(url, method, data, callback) {
    var dataSend = null;
    if (!isNullOrUndefined(data)) {
        dataSend = JSON.stringify(data);
    }

    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttp.open(method, url, true);

    if (!isNullOrUndefined(tag)) {
        xmlHttp.setRequestHeader('uid', tag);
        xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    }

    xmlHttp.send(dataSend);

    xmlHttp.onload = function () {
        if (this.status == 200) {
            console.log('Send data success: ' + this.responseText);
            if (isFunction(callback)) {
                callback(resp);
            }
        } else {
            console.log('Send data success: ' + this.responseText);
        }
    };

    xmlHttp.onerror = function () {
        console.log('Network is error');
    };
}

function postData(url, data, callback) {
    sendData(url, typeMethod.POST, data, callback);
}

function putData(url, data, callback) {
    sendData(url, typeMethod.PUT, data, callback);
}

function dataPreparation() {
    if (isNull(sessionId)) {
        var generaterId = new sessionTrackingGenerator();
        sessionId = generaterId.generate();
    }
    var device = getInfoDevice();

    var data = {
        campaignCode: tag,
        sessionTracking: sessionId,
        os: device.os,
        browserDevice: device.browserDevice,
        screenSize: device.screenSize,
        params: document.location.search,
        path: document.location.origin + document.location.pathname,
        isp: 'Viettel Fake',
        ipReference: document.referrer
    };
    return data;
}

function viewPage() {
    var data = dataPreparation();
    postData(ghdUrl + '/tracks', data);
}

function clickPage() {
    var data = dataPreparation();
    putData(ghdUrl + '/tracks/' + sessionId + '/isClicked', data);
}

function sessionTrackingGenerator() {
    this.length = 20;
    this.timestamp = +new Date();

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.generate = function () {
        var ts = this.timestamp.toString();
        var parts = ts.split('').reverse();
        var id = '';

        for (var i = 0; i < this.length; ++i) {
            var index = getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    };
}

function getInfoDevice() {

    // screen
    var screenSize = '';
    if (screen.width) {
        var width = (screen.width) ? screen.width : '';
        var height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion;
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // system
    var os = 'unknown';
    var clientStrings = [{
            s: 'Windows 10',
            r: /(Windows 10.0|Windows NT 10.0)/
        },
        {
            s: 'Windows 8.1',
            r: /(Windows 8.1|Windows NT 6.3)/
        },
        {
            s: 'Windows 8',
            r: /(Windows 8|Windows NT 6.2)/
        },
        {
            s: 'Windows 7',
            r: /(Windows 7|Windows NT 6.1)/
        },
        {
            s: 'Windows Vista',
            r: /Windows NT 6.0/
        },
        {
            s: 'Windows Server 2003',
            r: /Windows NT 5.2/
        },
        {
            s: 'Windows XP',
            r: /(Windows NT 5.1|Windows XP)/
        },
        {
            s: 'Windows 2000',
            r: /(Windows NT 5.0|Windows 2000)/
        },
        {
            s: 'Windows ME',
            r: /(Win 9x 4.90|Windows ME)/
        },
        {
            s: 'Windows 98',
            r: /(Windows 98|Win98)/
        },
        {
            s: 'Windows 95',
            r: /(Windows 95|Win95|Windows_95)/
        },
        {
            s: 'Windows NT 4.0',
            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
        },
        {
            s: 'Windows CE',
            r: /Windows CE/
        },
        {
            s: 'Windows 3.11',
            r: /Win16/
        },
        {
            s: 'Android',
            r: /Android/
        },
        {
            s: 'Open BSD',
            r: /OpenBSD/
        },
        {
            s: 'Sun OS',
            r: /SunOS/
        },
        {
            s: 'Chrome OS',
            r: /CrOS/
        },
        {
            s: 'Linux',
            r: /(Linux|X11(?!.*CrOS))/
        },
        {
            s: 'iOS',
            r: /(iPhone|iPad|iPod)/
        },
        {
            s: 'Mac OS X',
            r: /Mac OS X/
        },
        {
            s: 'Mac OS',
            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
        },
        {
            s: 'QNX',
            r: /QNX/
        },
        {
            s: 'UNIX',
            r: /UNIX/
        },
        {
            s: 'BeOS',
            r: /BeOS/
        },
        {
            s: 'OS/2',
            r: /OS\/2/
        },
        {
            s: 'Search Bot',
            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
        }
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = 'unknown';

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    var device = '';
    var deviceDetail = '';

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            device = nAgt.split(')')[0].split('(')[1].split(';');
            if (device.length <= 3) {
                deviceDetail = device[device.length - 1];
            } else {
                deviceDetail = device[device.length - 2] + ',' + device[device.length - 1];
            }
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nAgt);
            device = nAgt.split(')')[0].split('(')[1].split(';');
            deviceDetail = device[device.length - 1];
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    var data = {
        screenSize: screenSize,
        os: os + ' ' + osVersion,
        browserDevice: browser + ' ' + majorVersion + '(' + version + ')' + ',' + deviceDetail
    };
    return data;
}