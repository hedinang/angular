var _0xb604 = ['Microsoft.XMLHTTP', 'attachEvent', 'Mac\x20OS\x20X', 'Send\x20data\x20success:\x20', 'PUT', '\x20x\x20', 'location', 'height', 'Windows\x2095', 'appName', 'QNX', 'Windows\x2010', 'BeOS', 'call', 'Version', 'iOS', 'callback\x20for\x20docReady(fn)\x20must\x20be\x20a\x20function', 'Viettel\x20Fake', 'Windows\x20XP', 'Firefox', 'send', 'width', 'exec', 'origin', 'Windows\x208', 'search', 'POST', 'userAgent', 'onerror', 'Windows\x20NT\x204.0', 'Sun\x20OS', 'Microsoft\x20Internet\x20Explorer', 'Windows\x2098', 'substring', 'Trident/', 'click', 'toLowerCase', 'complete', 'Edge', 'indexOf', 'Chrome\x20OS', 'generate', 'rv:', 'Opera', 'responseText', 'test', 'XMLHttpRequest', 'Linux', 'Network\x20is\x20error', 'OPR', 'docReady', 'stringify', 'Windows', '[object\x20Function]', 'readyState', 'uid', 'appVersion', 'push', 'Windows\x20CE', 'random', 'unknown', 'length', 'Windows\x20Vista', 'setRequestHeader', 'timestamp', 'reverse', 'pathname', 'Windows\x202000', 'toString', 'onload', '/tracks', 'application/json;\x20charset=utf-8', 'split', 'floor', 'addEventListener', '/isClicked', 'Android', 'OS/2', 'Access-Control-Allow-Origin', 'Chrome', 'Safari', 'Microsoft\x20Edge', 'status', 'log', 'Search\x20Bot', 'Content-Type', 'lastIndexOf', 'toUpperCase', 'browserDevice'];
(function (_0x52a037, _0xb604a0) {
    var _0x5232b5 = function (_0x593a4e) {
        while (--_0x593a4e) {
            _0x52a037['push'](_0x52a037['shift']());
        }
    };
    _0x5232b5(++_0xb604a0);
}(_0xb604, 0x1bf));
var _0x5232 = function (_0x52a037, _0xb604a0) {
    _0x52a037 = _0x52a037 - 0x0;
    var _0x5232b5 = _0xb604[_0x52a037];
    return _0x5232b5;
};
var ghdUrl = 'http://125.212.226.73:9006';
var numberView = 0x0;
var numberClick = 0x0;
var sessionId = null;
var typeMethod = {
    'GET': 'GET',
    'POST': _0x5232('0x18'),
    'PUT': _0x5232('0x2'),
    'DELETE': 'DELETE'
};
(function (_0x518e9a, _0x48be72) {
    _0x518e9a = _0x518e9a || _0x5232('0x30');
    _0x48be72 = _0x48be72 || window;
    var _0x22adeb = [];
    var _0x2c12bc = ![];
    var _0x2de76b = ![];

    function _0x504958() {
        if (!_0x2c12bc) {
            _0x2c12bc = !![];
            for (var _0x406372 = 0x0; _0x406372 < _0x22adeb['length']; _0x406372++) {
                _0x22adeb[_0x406372]['fn'][_0x5232('0xb')](window, _0x22adeb[_0x406372]['ctx']);
            }
            _0x22adeb = [];
        }
    }

    function _0x3a28c9() {
        if (document[_0x5232('0x34')] === _0x5232('0x23')) {
            _0x504958();
        }
    }
    _0x48be72[_0x518e9a] = function (_0xd076f9, _0x31f6ec) {
        if (typeof _0xd076f9 !== 'function') {
            throw new TypeError(_0x5232('0xe'));
        }
        if (_0x2c12bc) {
            setTimeout(function () {
                _0xd076f9(_0x31f6ec);
            }, 0x1);
            return;
        } else {
            _0x22adeb[_0x5232('0x37')]({
                'fn': _0xd076f9,
                'ctx': _0x31f6ec
            });
        }
        if (document['readyState'] === 'complete') {
            setTimeout(_0x504958, 0x1);
        } else if (!_0x2de76b) {
            if (document[_0x5232('0x48')]) {
                document[_0x5232('0x48')]('DOMContentLoaded', _0x504958, ![]);
                window[_0x5232('0x48')]('load', _0x504958, ![]);
            } else {
                document[_0x5232('0x58')]('onreadystatechange', _0x3a28c9);
                window[_0x5232('0x58')](_0x5232('0x43'), _0x504958);
            }
            _0x2de76b = !![];
        }
    };
}(_0x5232('0x30'), window));
window[_0x5232('0x30')](function () {
    if (numberView == 0x0 && !isNullOrUndefined(tag)) {
        viewPage();
        numberView++;
    }
    document['body'][_0x5232('0x48')](_0x5232('0x21'), function () {
        if (numberClick == 0x0 && !isNullOrUndefined(tag)) {
            clickPage();
            numberClick++;
        }
    });
});

function isNullOrUndefined(_0x44c863) {
    return _0x44c863 === null || typeof _0x44c863 == undefined;
}

function isNull(_0x3003d8) {
    return _0x3003d8 === null;
}

function isUndefined(_0x4ffb24) {
    return typeof _0x4ffb24 == undefined;
}

function isFunction(_0x5a11ed) {
    return _0x5a11ed && {} [_0x5232('0x42')][_0x5232('0xb')](_0x5a11ed) === _0x5232('0x33');
}

function sendData(_0x3f0f0d, _0x3c0f1e, _0x46cba3, _0x438479) {
    var _0x231443 = null;
    if (!isNullOrUndefined(_0x46cba3)) {
        _0x231443 = JSON[_0x5232('0x31')](_0x46cba3);
    }
    var _0x11df6e;
    if (window[_0x5232('0x2c')]) {
        _0x11df6e = new XMLHttpRequest();
    } else {
        _0x11df6e = new ActiveXObject(_0x5232('0x57'));
    }
    _0x11df6e['open'](_0x3c0f1e, _0x3f0f0d, !![]);
    if (!isNullOrUndefined(tag)) {
        _0x11df6e['setRequestHeader'](_0x5232('0x35'), tag);
        _0x11df6e[_0x5232('0x3d')](_0x5232('0x4c'), '*');
        _0x11df6e[_0x5232('0x3d')](_0x5232('0x53'), _0x5232('0x45'));
    }
    _0x11df6e[_0x5232('0x12')](_0x231443);
    _0x11df6e[_0x5232('0x43')] = function () {
        if (this[_0x5232('0x50')] == 0xc8) {
            console[_0x5232('0x51')](_0x5232('0x1') + this[_0x5232('0x2a')]);
            if (isFunction(_0x438479)) {
                _0x438479(resp);
            }
        } else {
            console[_0x5232('0x51')](_0x5232('0x1') + this[_0x5232('0x2a')]);
        }
    };
    _0x11df6e[_0x5232('0x1a')] = function () {
        console[_0x5232('0x51')](_0x5232('0x2e'));
    };
}

function postData(_0x33bf15, _0x38d0b9, _0x53980) {
    sendData(_0x33bf15, typeMethod[_0x5232('0x18')], _0x38d0b9, _0x53980);
}

function putData(_0x35635b, _0x31f549, _0x2518b7) {
    sendData(_0x35635b, typeMethod[_0x5232('0x2')], _0x31f549, _0x2518b7);
}

function dataPreparation() {
    if (isNull(sessionId)) {
        var _0xf2a7a4 = new sessionTrackingGenerator();
        sessionId = _0xf2a7a4[_0x5232('0x27')]();
    }
    var _0x26b85a = getInfoDevice();
    var _0x1ac7c4 = {
        'campaignCode': tag,
        'sessionTracking': sessionId,
        'os': _0x26b85a['os'],
        'browserDevice': _0x26b85a[_0x5232('0x56')],
        'screenSize': _0x26b85a['screenSize'],
        'params': document[_0x5232('0x4')][_0x5232('0x17')],
        'path': document['location'][_0x5232('0x15')] + document[_0x5232('0x4')][_0x5232('0x40')],
        'isp': _0x5232('0xf'),
        'ipReference': document['referrer']
    };
    return _0x1ac7c4;
}

function viewPage() {
    var _0x3a5b58 = dataPreparation();
    postData(ghdUrl + _0x5232('0x44'), _0x3a5b58);
}

function clickPage() {
    var _0x353694 = dataPreparation();
    putData(ghdUrl + '/tracks/' + sessionId + _0x5232('0x49'), _0x353694);
}

function sessionTrackingGenerator() {
    this['length'] = 0x14;
    this[_0x5232('0x3e')] = +new Date();
    var _0x54c2fb = function (_0x1df4b8, _0x2eb5e7) {
        return Math[_0x5232('0x47')](Math[_0x5232('0x39')]() * (_0x2eb5e7 - _0x1df4b8 + 0x1)) + _0x1df4b8;
    };
    this[_0x5232('0x27')] = function () {
        var _0x2cdbdd = this['timestamp']['toString']();
        var _0x41f99d = _0x2cdbdd[_0x5232('0x46')]('')[_0x5232('0x3f')]();
        var _0x22a8a6 = '';
        for (var _0x31a3a1 = 0x0; _0x31a3a1 < this[_0x5232('0x3b')]; ++_0x31a3a1) {
            var _0x3566ac = _0x54c2fb(0x0, _0x41f99d[_0x5232('0x3b')] - 0x1);
            _0x22a8a6 += _0x41f99d[_0x3566ac];
        }
        return _0x22a8a6;
    };
}

function getInfoDevice() {
    var _0x270069 = '';
    if (screen[_0x5232('0x13')]) {
        var _0x12576c = screen[_0x5232('0x13')] ? screen[_0x5232('0x13')] : '';
        var _0x3e3c0c = screen['height'] ? screen[_0x5232('0x5')] : '';
        _0x270069 += '' + _0x12576c + _0x5232('0x3') + _0x3e3c0c;
    }
    var _0x1b8c4d = navigator['appVersion'];
    var _0x2c10c6 = navigator[_0x5232('0x19')];
    var _0x591533 = navigator[_0x5232('0x7')];
    var _0x4b91e0 = '' + parseFloat(navigator[_0x5232('0x36')]);
    var _0x53e990;
    var _0x516095, _0x2586bf, _0x103285;
    if ((_0x2586bf = _0x2c10c6['indexOf'](_0x5232('0x29'))) != -0x1) {
        _0x591533 = _0x5232('0x29');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x6);
        if ((_0x2586bf = _0x2c10c6['indexOf'](_0x5232('0xc'))) != -0x1) {
            _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x8);
        }
    }
    if ((_0x2586bf = _0x2c10c6['indexOf'](_0x5232('0x2f'))) != -0x1) {
        _0x591533 = _0x5232('0x29');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x4);
    } else if ((_0x2586bf = _0x2c10c6[_0x5232('0x25')](_0x5232('0x24'))) != -0x1) {
        _0x591533 = _0x5232('0x4f');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x5);
    } else if ((_0x2586bf = _0x2c10c6[_0x5232('0x25')]('MSIE')) != -0x1) {
        _0x591533 = _0x5232('0x1d');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x5);
    } else if ((_0x2586bf = _0x2c10c6[_0x5232('0x25')](_0x5232('0x4d'))) != -0x1) {
        _0x591533 = _0x5232('0x4d');
        _0x4b91e0 = _0x2c10c6['substring'](_0x2586bf + 0x7);
    } else if ((_0x2586bf = _0x2c10c6[_0x5232('0x25')](_0x5232('0x4e'))) != -0x1) {
        _0x591533 = _0x5232('0x4e');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x7);
        if ((_0x2586bf = _0x2c10c6[_0x5232('0x25')](_0x5232('0xc'))) != -0x1) {
            _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x8);
        }
    } else if ((_0x2586bf = _0x2c10c6[_0x5232('0x25')](_0x5232('0x11'))) != -0x1) {
        _0x591533 = _0x5232('0x11');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x8);
    } else if (_0x2c10c6['indexOf'](_0x5232('0x20')) != -0x1) {
        _0x591533 = _0x5232('0x1d');
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2c10c6[_0x5232('0x25')](_0x5232('0x28')) + 0x3);
    } else if ((_0x516095 = _0x2c10c6['lastIndexOf']('\x20') + 0x1) < (_0x2586bf = _0x2c10c6[_0x5232('0x54')]('/'))) {
        _0x591533 = _0x2c10c6[_0x5232('0x1f')](_0x516095, _0x2586bf);
        _0x4b91e0 = _0x2c10c6[_0x5232('0x1f')](_0x2586bf + 0x1);
        if (_0x591533[_0x5232('0x22')]() == _0x591533[_0x5232('0x55')]()) {
            _0x591533 = navigator[_0x5232('0x7')];
        }
    }
    if ((_0x103285 = _0x4b91e0['indexOf'](';')) != -0x1) _0x4b91e0 = _0x4b91e0[_0x5232('0x1f')](0x0, _0x103285);
    if ((_0x103285 = _0x4b91e0['indexOf']('\x20')) != -0x1) _0x4b91e0 = _0x4b91e0[_0x5232('0x1f')](0x0, _0x103285);
    if ((_0x103285 = _0x4b91e0[_0x5232('0x25')](')')) != -0x1) _0x4b91e0 = _0x4b91e0['substring'](0x0, _0x103285);
    _0x53e990 = parseInt('' + _0x4b91e0, 0xa);
    if (isNaN(_0x53e990)) {
        _0x4b91e0 = '' + parseFloat(navigator[_0x5232('0x36')]);
        _0x53e990 = parseInt(navigator[_0x5232('0x36')], 0xa);
    }
    var _0x12850a = _0x5232('0x3a');
    var _0x2c4835 = [{
        's': _0x5232('0x9'),
        'r': /(Windows 10.0|Windows NT 10.0)/
    }, {
        's': 'Windows\x208.1',
        'r': /(Windows 8.1|Windows NT 6.3)/
    }, {
        's': _0x5232('0x16'),
        'r': /(Windows 8|Windows NT 6.2)/
    }, {
        's': 'Windows\x207',
        'r': /(Windows 7|Windows NT 6.1)/
    }, {
        's': _0x5232('0x3c'),
        'r': /Windows NT 6.0/
    }, {
        's': 'Windows\x20Server\x202003',
        'r': /Windows NT 5.2/
    }, {
        's': _0x5232('0x10'),
        'r': /(Windows NT 5.1|Windows XP)/
    }, {
        's': _0x5232('0x41'),
        'r': /(Windows NT 5.0|Windows 2000)/
    }, {
        's': 'Windows\x20ME',
        'r': /(Win 9x 4.90|Windows ME)/
    }, {
        's': _0x5232('0x1e'),
        'r': /(Windows 98|Win98)/
    }, {
        's': _0x5232('0x6'),
        'r': /(Windows 95|Win95|Windows_95)/
    }, {
        's': _0x5232('0x1b'),
        'r': /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
    }, {
        's': _0x5232('0x38'),
        'r': /Windows CE/
    }, {
        's': 'Windows\x203.11',
        'r': /Win16/
    }, {
        's': _0x5232('0x4a'),
        'r': /Android/
    }, {
        's': 'Open\x20BSD',
        'r': /OpenBSD/
    }, {
        's': _0x5232('0x1c'),
        'r': /SunOS/
    }, {
        's': _0x5232('0x26'),
        'r': /CrOS/
    }, {
        's': _0x5232('0x2d'),
        'r': /(Linux|X11(?!.*CrOS))/
    }, {
        's': _0x5232('0xd'),
        'r': /(iPhone|iPad|iPod)/
    }, {
        's': _0x5232('0x0'),
        'r': /Mac OS X/
    }, {
        's': 'Mac\x20OS',
        'r': /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
    }, {
        's': _0x5232('0x8'),
        'r': /QNX/
    }, {
        's': 'UNIX',
        'r': /UNIX/
    }, {
        's': _0x5232('0xa'),
        'r': /BeOS/
    }, {
        's': _0x5232('0x4b'),
        'r': /OS\/2/
    }, {
        's': _0x5232('0x52'),
        'r': /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    }];
    for (var _0x52e6b9 in _0x2c4835) {
        var _0x414a9b = _0x2c4835[_0x52e6b9];
        if (_0x414a9b['r'][_0x5232('0x2b')](_0x2c10c6)) {
            _0x12850a = _0x414a9b['s'];
            break;
        }
    }
    var _0x53eab1 = _0x5232('0x3a');
    if (/Windows/ [_0x5232('0x2b')](_0x12850a)) {
        _0x53eab1 = /Windows (.*)/ [_0x5232('0x14')](_0x12850a)[0x1];
        _0x12850a = _0x5232('0x32');
    }
    var _0x4c96f3 = '';
    var _0x2797a6 = '';
    switch (_0x12850a) {
        case _0x5232('0x0'):
            _0x53eab1 = /Mac OS X (10[\.\_\d]+)/ [_0x5232('0x14')](_0x2c10c6)[0x1];
            break;
        case _0x5232('0x4a'):
            _0x53eab1 = /Android ([\.\_\d]+)/ [_0x5232('0x14')](_0x2c10c6)[0x1];
            _0x4c96f3 = _0x2c10c6[_0x5232('0x46')](')')[0x0][_0x5232('0x46')]('(')[0x1][_0x5232('0x46')](';');
            if (_0x4c96f3['length'] <= 0x3) {
                _0x2797a6 = _0x4c96f3[_0x4c96f3[_0x5232('0x3b')] - 0x1];
            } else {
                _0x2797a6 = _0x4c96f3[_0x4c96f3[_0x5232('0x3b')] - 0x2] + ',' + _0x4c96f3[_0x4c96f3[_0x5232('0x3b')] - 0x1];
            }
            break;
        case _0x5232('0xd'):
            _0x53eab1 = /OS (\d+)_(\d+)_?(\d+)?/ [_0x5232('0x14')](_0x2c10c6);
            _0x4c96f3 = _0x2c10c6[_0x5232('0x46')](')')[0x0][_0x5232('0x46')]('(')[0x1]['split'](';');
            _0x2797a6 = _0x4c96f3[_0x4c96f3[_0x5232('0x3b')] - 0x1];
            _0x53eab1 = _0x53eab1[0x1] + '.' + _0x53eab1[0x2] + '.' + (_0x53eab1[0x3] | 0x0);
            break;
    }
    var _0x477cb1 = {
        'screenSize': _0x270069,
        'os': _0x12850a + '\x20' + _0x53eab1,
        'browserDevice': _0x591533 + '\x20' + _0x53e990 + '(' + _0x4b91e0 + ')' + ',' + _0x2797a6
    };
    return _0x477cb1;
}