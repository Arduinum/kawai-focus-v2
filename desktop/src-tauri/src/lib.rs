#[cfg(target_os = "linux")]
fn apply_linux_webkit_cli_flags() {
    let disable = std::env::args().any(|a| a == "--disable-webkit-compositing");
    if disable {
        unsafe { std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1"); }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    apply_linux_webkit_cli_flags();

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске приложения Tauri.");
}
