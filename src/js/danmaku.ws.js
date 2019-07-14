import axios from 'axios';

function send(options) {
    axios.post(options.url, options.data).
    then((response) => {
        const data = response.data;
        if (!data || data.code !== 0) {
            options.error && options.error(data && data.msg);
            return;
        }
        options.success && options.success(data);
    }).
    catch((e) => {
        console.error(e);
        options.error && options.error();
    });
}

function read(options) {
    axios.get(options.url).
    then((response) => {
        const data = response.data;
        if (!data || data.code !== 0) {
            options.error && options.error(data && data.msg);
            return;
        }
        options.success && options.success(data.data.map((item) => ({
            time: item[0],
            type: item[1],
            color: item[2],
            author: item[3],
            text: item[4]
        })));
    }).
    catch((e) => {
        console.error(e);
        options.error && options.error();
    });
}

window.createApiBackend = function(url, data, onMessage) {
    var ws;
    var connect = function() {
        ws = new WebSocket(url);
        ws.onopen = function() {
            var login = {
                type: "login",
                id: data.videoUrl
            }
            ws.send(JSON.stringify(login));
        };
        ws.onmessage = function(event) {
            onMessage(JSON.parse(event.data));
        };
        ws.onclose = function() {
            // Try to reconnect in 5 seconds
            setTimeout(connect, 5000);
        };
    };
    var connected = false;
    window.addEventListener('beforeunload', function() {
        ws.onclose = null;
        ws.close();
    });
    return {
        read: function(options) {
            read(options);
            if (connected) {
                return;
            }
            connected = true;
            connect();
            //options.success();

        },
        send: function(options) {
            send(options);
            ws.send(JSON.stringify(options.data));
            //options.success();
        }
    };
}

/* global DPLAYER_VERSION GIT_HASH */
console.log(`${'\n'} %c Danmaku.ws v1.0.0 By Momik %c https://jsonpop.github.io ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');