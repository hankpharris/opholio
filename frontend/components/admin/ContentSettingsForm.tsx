'use client';

import { useEffect, useState } from "react";

interface SiteSettings {
    siteTitle: string;
    tagline: string;
    aboutContent: string;
    avatarShape: "circle" | "square";
    avatarImageUrl: string | null;
    logoImageUrl: string | null;
}

export function ContentSettingsForm() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/site-settings")
            .then((res) => res.json())
            .then((data) => setSettings(data))
            .catch(() => setStatus("Failed to load settings."));
    }, []);

    const updateField = (field: keyof SiteSettings, value: SiteSettings[keyof SiteSettings]) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        setStatus(null);
        try {
            const response = await fetch("/api/admin/site-settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (!response.ok) {
                throw new Error("Failed to save settings.");
            }

            setStatus("Saved.");
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const handleUpload = async (field: "avatarImageUrl" | "logoImageUrl", file: File) => {
        setStatus(null);
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            setStatus("Image upload failed.");
            return;
        }

        const { url } = await response.json();
        updateField(field, url);
    };

    const handleDelete = async (field: "avatarImageUrl" | "logoImageUrl") => {
        if (!settings?.[field]) return;
        const response = await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: settings[field] }),
        });

        if (response.ok) {
            updateField(field, null);
        } else {
            setStatus("Failed to delete image.");
        }
    };

    if (!settings) {
        return <p className="text-sm text-gray-500">Loading...</p>;
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={settings.siteTitle}
                    onChange={(event) => updateField("siteTitle", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tagline</label>
                <input
                    type="text"
                    value={settings.tagline}
                    onChange={(event) => updateField("tagline", event.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">About content</label>
                <textarea
                    value={settings.aboutContent}
                    onChange={(event) => updateField("aboutContent", event.target.value)}
                    rows={6}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">About image shape</label>
                <select
                    value={settings.avatarShape}
                    onChange={(event) =>
                        updateField("avatarShape", event.target.value as SiteSettings["avatarShape"])
                    }
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    <option value="circle">Circle</option>
                    <option value="square">Square (small radius)</option>
                </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {[
                    { field: "avatarImageUrl", label: "Avatar image" },
                    { field: "logoImageUrl", label: "Logo image" },
                ].map((item) => (
                    <div key={item.field} className="rounded-lg border border-gray-200 p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">{item.label}</p>
                        {settings[item.field as keyof SiteSettings] && (
                            <img
                                src={settings[item.field as keyof SiteSettings] as string}
                                alt={item.label}
                                className={`w-32 h-32 object-cover mb-2 ${
                                    item.field === "avatarImageUrl"
                                        ? settings.avatarShape === "square"
                                            ? "rounded-lg"
                                            : "rounded-full"
                                        : "rounded-full"
                                }`}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) void handleUpload(item.field as "avatarImageUrl" | "logoImageUrl", file);
                            }}
                        />
                        {settings[item.field as keyof SiteSettings] && (
                            <button
                                onClick={() => handleDelete(item.field as "avatarImageUrl" | "logoImageUrl")}
                                className="mt-2 text-sm text-red-600 hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save changes"}
                </button>
                {status && <p className="text-sm text-gray-600">{status}</p>}
            </div>
        </div>
    );
}
