'use client';

import { useEffect, useState } from "react";

interface FeatureSettings {
    enableBackground: boolean;
    enableChatbot: boolean;
    enableContactForm: boolean;
    enableGithubButton: boolean;
    backgroundQuality: "low" | "med" | "high";
    reducedMotionOverride: boolean | null;
}

export function FeatureSettingsForm() {
    const [settings, setSettings] = useState<FeatureSettings | null>(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/site-settings")
            .then((res) => res.json())
            .then((data) => setSettings(data))
            .catch(() => setStatus("Failed to load settings."));
    }, []);

    const updateField = (field: keyof FeatureSettings, value: FeatureSettings[keyof FeatureSettings]) => {
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

    if (!settings) {
        return <p className="text-sm text-gray-500">Loading...</p>;
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={settings.enableBackground}
                        onChange={(event) => updateField("enableBackground", event.target.checked)}
                    />
                    <span>Enable background packs</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={settings.enableChatbot}
                        onChange={(event) => updateField("enableChatbot", event.target.checked)}
                    />
                    <span>Enable chatbot</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={settings.enableContactForm}
                        onChange={(event) => updateField("enableContactForm", event.target.checked)}
                    />
                    <span>Enable contact form</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={settings.enableGithubButton}
                        onChange={(event) => updateField("enableGithubButton", event.target.checked)}
                    />
                    <span>Enable GitHub button</span>
                </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background quality</label>
                    <select
                        value={settings.backgroundQuality}
                        onChange={(event) =>
                            updateField("backgroundQuality", event.target.value as FeatureSettings["backgroundQuality"])
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                        <option value="low">Low</option>
                        <option value="med">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reduced motion override</label>
                    <select
                        value={
                            settings.reducedMotionOverride === null
                                ? "system"
                                : settings.reducedMotionOverride
                                    ? "true"
                                    : "false"
                        }
                        onChange={(event) => {
                            const value = event.target.value;
                            updateField(
                                "reducedMotionOverride",
                                value === "system" ? null : value === "true"
                            );
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                        <option value="system">Follow system preference</option>
                        <option value="true">Force reduced motion</option>
                        <option value="false">Force full motion</option>
                    </select>
                </div>
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
