#[cfg(target_os = "linux")]
pub fn apply_linux_cli_flags() {
    let disable_webkit_compositing_mode = std::env::args().any(|a| a == "--webkit-disable-compositing-mode");
    if disable_webkit_compositing_mode {
        unsafe { std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1"); }
    }

    let webkit_disable_dmabuf_renderer = std::env::args().any(|a| a == "--webkit-disable-dmabuf-renderer");
    if webkit_disable_dmabuf_renderer {
        unsafe { std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1"); }
    }

    let nv_disable_explicit_sync = std::env::args().any(|a| a == "--nv-disable-explicit-sync");
    if nv_disable_explicit_sync {
        unsafe { std::env::set_var("__NV_DISABLE_EXPLICIT_SYNC", "1"); }
    }
}

#[cfg(target_os = "linux")]
pub fn print_help() {
    println!(
r#"Kawai Focus — Pomodoro таймер

Использование:
    kawai-focus [FLAGS]

Флаги (Linux):

    --webkit-disable-compositing-mode
        Отключает WebKit compositing mode.
        Помогает при графических артефактах на некоторых GPU.

    --webkit-disable-dmabuf-renderer
        Отключает DMA-BUF renderer WebKit.
        Полезно при проблемах с Wayland и с отсутствием GBM.

    --nv-disable-explicit-sync
        Отключает explicit sync драйвера NVIDIA.
        Иногда исправляет: зависания интерфейса, проблемы с отсутствием GBM.

    --help
        Показать эту справку и выйти.
"#);
}
