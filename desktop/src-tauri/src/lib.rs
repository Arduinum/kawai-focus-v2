mod flags;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(target_os = "linux")]
    if std::env::args().any(|a| a == "--help" || a == "-h") {
        flags::print_help();
        std::process::exit(0);
    }

    #[cfg(target_os = "linux")]
    flags::apply_linux_cli_flags();

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("Ошибка при запуске приложения Tauri.");
}
