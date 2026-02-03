'use client';

import { useEffect, useState } from "react";

interface BackgroundPack {
    id: string;
    name: string;
    version: string;
    entryUrl: string;
    manifestUrl: string;
    previewUrl: string | null;
    interactive: boolean;
    allowExternal: boolean;
    manifest?: {
        controls?: Array<{
            key: string;
            type?: "toggle" | "number" | "select" | "text" | "color";
            label: string;
            default?: unknown;
            min?: number;
            max?: number;
            step?: number;
            options?: string[];
            help?: string;
        }>;
    };
    createdAt: string;
}

export function BackgroundPacksManager() {
    const [packs, setPacks] = useState<BackgroundPack[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [config, setConfig] = useState<Record<string, unknown>>({});
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const loadData = async () => {
        const [packsRes, settingsRes] = await Promise.all([
            fetch("/api/admin/background-packs"),
            fetch("/api/admin/site-settings"),
        ]);

        if (packsRes.ok) {
            setPacks(await packsRes.json());
        }

        if (settingsRes.ok) {
            const settings = await settingsRes.json();
            setActiveId(settings.activeBackgroundPackId ?? null);
            setConfig(settings.backgroundConfig ?? {});
        }
    };

    useEffect(() => {
        void loadData();
    }, []);

    const handleUpload = async (file: File) => {
        setUploading(true);
        setStatus(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/admin/background-packs/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error?.error ?? "Upload failed");
            }

            setStatus("Upload complete.");
            await loadData();
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleActivate = async (id: string) => {
        setStatus(null);
        const response = await fetch(`/api/admin/background-packs/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "activate" }),
        });

        if (response.ok) {
            setActiveId(id);
        }
    };

    const handleDeactivate = async () => {
        setStatus(null);
        if (!activeId) return;
        const response = await fetch(`/api/admin/background-packs/${activeId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "deactivate" }),
        });

        if (response.ok) {
            setActiveId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this background pack?")) return;
        const response = await fetch(`/api/admin/background-packs/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            await loadData();
        }
    };

    const handleConfigSave = async () => {
        setStatus(null);
        const sanitizedConfig = { ...config };
        controls.forEach((control) => {
            const value = sanitizedConfig[control.key];
            if (control.type === "number" && typeof value === "number") {
                const min = control.min ?? value;
                const max = control.max ?? value;
                sanitizedConfig[control.key] = Math.min(Math.max(value, min), max);
            }
            if (control.type === "toggle") {
                sanitizedConfig[control.key] = Boolean(value);
            }
        });
        const response = await fetch("/api/admin/site-settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ backgroundConfig: sanitizedConfig }),
        });

        if (response.ok) {
            setStatus("Background config saved.");
        } else {
            setStatus("Failed to save background config.");
        }
    };

    const activePack = packs.find((pack) => pack.id === activeId);
    const controls = activePack?.manifest?.controls ?? [];

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-dashed border-gray-300 bg-white dark:bg-gray-800 p-6">
                <h3 className="text-lg font-semibold mb-2">Upload background pack</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Upload a zip containing manifest.json and index.html.
                </p>
                <input
                    type="file"
                    accept=".zip"
                    disabled={uploading}
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void handleUpload(file);
                    }}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                />
                {status && <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">{status}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {packs.map((pack) => (
                    <div key={pack.id} className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow">
                        {pack.previewUrl && (
                            <img
                                src={pack.previewUrl}
                                alt={`${pack.name} preview`}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                        )}
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {pack.name} <span className="text-sm text-gray-500">v{pack.version}</span>
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {pack.allowExternal ? "External allowed" : "External blocked"}
                                    {" · "}
                                    {pack.interactive ? "Interactive" : "Non-interactive"}
                                </p>
                            </div>
                            {activeId === pack.id && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                    Active
                                </span>
                            )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {activeId === pack.id ? (
                                <button
                                    onClick={handleDeactivate}
                                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    Deactivate
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleActivate(pack.id)}
                                    className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Activate
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(pack.id)}
                                className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {packs.length === 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        No packs uploaded yet.
                    </div>
                )}
            </div>

            {activePack && controls.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Background controls</h3>
                        <p className="text-sm text-gray-500">Adjust the active background pack settings.</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {controls.map((control) => {
                            const currentValue =
                                config[control.key] ??
                                control.default ??
                                (control.type === "toggle" ? false : "");

                            if (control.type === "toggle") {
                                return (
                                    <label key={control.key} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(currentValue)}
                                            onChange={(event) =>
                                                setConfig({ ...config, [control.key]: event.target.checked })
                                            }
                                        />
                                        <span>{control.label}</span>
                                    </label>
                                );
                            }

                            if (control.type === "select") {
                                return (
                                    <div key={control.key}>
                                        <label className="block text-sm font-medium">{control.label}</label>
                                        <select
                                            value={String(currentValue)}
                                            onChange={(event) =>
                                                setConfig({ ...config, [control.key]: event.target.value })
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                        >
                                            {(control.options ?? []).map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            }

                            if (control.type === "number") {
                                const min = control.min ?? 0;
                                const max = control.max ?? 100;
                                const step = control.step ?? 1;
                                return (
                                    <div key={control.key}>
                                        <label className="block text-sm font-medium">{control.label}</label>
                                        <input
                                            type="number"
                                            min={min}
                                            max={max}
                                            step={step}
                                            value={Number(currentValue)}
                                            onChange={(event) =>
                                                setConfig({ ...config, [control.key]: Number(event.target.value) })
                                            }
                                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div key={control.key}>
                                    <label className="block text-sm font-medium">{control.label}</label>
                                    <input
                                        type="text"
                                        value={String(currentValue)}
                                        onChange={(event) =>
                                            setConfig({ ...config, [control.key]: event.target.value })
                                        }
                                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={handleConfigSave}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save background config
                    </button>
                </div>
            )}
        </div>
    );
}
