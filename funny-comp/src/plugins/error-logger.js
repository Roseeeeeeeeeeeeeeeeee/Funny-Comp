import ErrorLogger from './ErrorLogger.vue';
export default {
    install(app, options = {} ) {
        // 参数归一化
        //默认的配置项
        const defaultOptions = {
            logToConsole: true, // 是否打印错误到控制台
            sendRomoteErr: false, //是否吧错误日志发送到远程服务器
            remoteUrl: ''    // 远程服务器地址
        };
        // 合并用户传入的配置与默认配置
        const config = {
            ...options,
            ...defaultOptions
        };
        // 注册错误可视化组件
        app.component('ErrorLog', ErrorLogger);
        // 捕获vue错误
        app.config.errorHandler = (err, vm, info) => {
            handleError(err, info);
           
        };
        // 捕获未处理的promise错误
        window.addEventListener('unhandledrejection', (event) => {
            handleError(event.reason, 'unhandled promise rejection error');
        });
        // 统一处理错误
        /**
         * 统一处理错误
         * @param {*} error 错误对象
         * @param {*} info 错误的详细信息
         */
        function handleError(error, info) {
            if (config.logToConsole) {
                console.error(`错误${info}`,error)
            }
            if(config.sendRomoteErr && config.remoteUrl){
                fetch(config.remoteUrl,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        error : error.message , // 错误消息
                        stack : error.stack, //错误堆栈
                        info,// 具体的错误说明信息
                        time : new Date().toISOString()
                    })

                }).catch(()=>{
                    console.error('发送错误日志失败')
                })
            }
        }
    }
};
