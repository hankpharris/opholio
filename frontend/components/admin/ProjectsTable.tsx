'use client';

import { useState } from 'react';
import { Status } from '@/lib/validation';

interface Project {
    id: number;
    name: string;
    status: Status;
    overviewText: string | null;
    description: string | null;
    overviewImage1: string | null;
    overviewImage2: string | null;
    overviewImage3: string | null;
    link: string | null;
    gitHubLink: string | null;
    isActive: boolean;
}

interface ProjectsTableProps {
    initialProjects: Project[];
}

export function ProjectsTable({ initialProjects }: ProjectsTableProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedProject, setEditedProject] = useState<Project | null>(null);
    const [uploadingImage, setUploadingImage] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Project>>({
        name: '',
        status: 'Planned' as Status,
        overviewText: '',
        description: '',
        overviewImage1: null,
        overviewImage2: null,
        overviewImage3: null,
        link: null,
        gitHubLink: null,
        isActive: true,
    });

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setEditedProject({ ...project });
    };

    const handleSave = async (projectId: number) => {
        if (!editedProject) return;

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProject),
            });

            if (!response.ok) throw new Error('Failed to update project');

            setProjects(projects.map(p => 
                p.id === projectId ? editedProject : p
            ));
            setEditingId(null);
            setEditedProject(null);
        } catch (error) {
            console.error('Error updating project:', error);
            // TODO: Add error handling UI
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedProject(null);
    };

    function handleChange<K extends keyof Project>(field: K, value: Project[K]) {
        if (!editedProject) return;
        setEditedProject({ ...editedProject, [field]: value });
    }

    function handleNewProjectChange<K extends keyof Project>(field: K, value: Project[K]) {
        setNewProject(prev => ({ ...prev, [field]: value }));
    }

    const handleCreateProject = async () => {
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) throw new Error('Failed to create project');

            const createdProjectResponse = await response.json();
            const createdProject = Array.isArray(createdProjectResponse)
                ? createdProjectResponse[0]
                : createdProjectResponse;

            if (!createdProject) {
                throw new Error('Invalid project response');
            }

            setProjects([...projects, createdProject as Project]);
            setIsCreating(false);
            setNewProject({
                name: '',
                status: 'Planned' as Status,
                overviewText: '',
                description: '',
                overviewImage1: null,
                overviewImage2: null,
                overviewImage3: null,
                link: null,
                gitHubLink: null,
                isActive: true,
            });
        } catch (error) {
            console.error('Error creating project:', error);
            // TODO: Add error handling UI
        }
    };

    const handleImageUpload = async (field: 'overviewImage1' | 'overviewImage2' | 'overviewImage3', file: File) => {
        if (!editedProject) return;
        
        setUploadingImage(field);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload image');

            const { url } = await response.json();
            handleChange(field, url);
        } catch (error) {
            console.error('Error uploading image:', error);
            // TODO: Add error handling UI
        } finally {
            setUploadingImage(null);
        }
    };

    const handleDeleteImage = async (field: 'overviewImage1' | 'overviewImage2' | 'overviewImage3') => {
        if (!editedProject || !editedProject[field]) return;

        try {
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: editedProject[field] }),
            });

            if (!response.ok) throw new Error('Failed to delete image');

            handleChange(field, '');
        } catch (error) {
            console.error('Error deleting image:', error);
            // TODO: Add error handling UI
        }
    };

    const handleDeleteProject = async (projectId: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete project');

            setProjects(projects.filter(p => p.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
            // TODO: Add error handling UI
        }
    };

    const handleNewImageUpload = async (field: 'overviewImage1' | 'overviewImage2' | 'overviewImage3', file: File) => {
        setUploadingImage(field);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to upload image');

            const { url } = await response.json();
            setNewProject(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            // TODO: Add error handling UI
        } finally {
            setUploadingImage(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        New Project
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleCreateProject}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Overview</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Images</th>
                            <th className="px-4 py-2">Links</th>
                            <th className="px-4 py-2">Active</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isCreating && (
                            <tr className="border-t dark:border-gray-700">
                                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                    New
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        value={newProject.name}
                                        onChange={(e) => handleNewProjectChange('name', e.target.value)}
                                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        placeholder="Project Name"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        value={newProject.status}
                                        onChange={(e) => handleNewProjectChange('status', e.target.value as Status)}
                                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        <option value="InProgress">In Progress</option>
                                        <option value="CompleteMaintained">Complete (Maintained)</option>
                                        <option value="CompleteUnmaintained">Complete (Unmaintained)</option>
                                        <option value="Planned">Planned</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <textarea
                                        value={newProject.overviewText || ''}
                                        onChange={(e) => handleNewProjectChange('overviewText', e.target.value)}
                                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        rows={3}
                                        placeholder="Overview"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <textarea
                                        value={newProject.description || ''}
                                        onChange={(e) => handleNewProjectChange('description', e.target.value)}
                                        className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        rows={3}
                                        placeholder="Description"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <div className="space-y-2">
                                        {(['overviewImage1', 'overviewImage2', 'overviewImage3'] as const).map((field) => (
                                            <div key={field} className="space-y-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleNewImageUpload(field, file);
                                                    }}
                                                    className="hidden"
                                                    id={`new-${field}`}
                                                />
                                                <label
                                                    htmlFor={`new-${field}`}
                                                    className={`block px-3 py-1 text-sm text-center rounded cursor-pointer
                                                        ${uploadingImage === field
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-blue-600 hover:bg-blue-700'
                                                        } text-white`}
                                                >
                                                    {uploadingImage === field
                                                        ? 'Uploading...'
                                                        : 'Upload Image'
                                                    }
                                                </label>
                                                {newProject[field] && (
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        Current: {newProject[field]}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={newProject.link || ''}
                                            onChange={(e) => handleNewProjectChange('link', e.target.value)}
                                            placeholder="Project URL"
                                            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <input
                                            type="text"
                                            value={newProject.gitHubLink || ''}
                                            onChange={(e) => handleNewProjectChange('gitHubLink', e.target.value)}
                                            placeholder="GitHub URL"
                                            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={newProject.isActive ?? true}
                                        onChange={(e) => handleNewProjectChange('isActive', e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    {/* Actions are handled by the buttons above the table */}
                                </td>
                            </tr>
                        )}
                        {projects.map((project) => (
                            <tr key={project.id} className="border-t dark:border-gray-700">
                                <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                    {project.id}
                                </td>
                                <td className="px-4 py-2">
                                    {editingId === project.id ? (
                                        <input
                                            type="text"
                                            value={editedProject?.name || ''}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    ) : (
                                        project.name
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingId === project.id ? (
                                        <select
                                            value={editedProject?.status || ''}
                                            onChange={(e) => handleChange('status', e.target.value as Status)}
                                            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <option value="InProgress">In Progress</option>
                                            <option value="CompleteMaintained">Complete (Maintained)</option>
                                            <option value="CompleteUnmaintained">Complete (Unmaintained)</option>
                                            <option value="Planned">Planned</option>
                                        </select>
                                    ) : (
                                        project.status
                                    )}
                                </td>
                                <td className="px-4 py-2 max-w-xs">
                                    {editingId === project.id ? (
                                        <textarea
                                            value={editedProject?.overviewText || ''}
                                            onChange={(e) => handleChange('overviewText', e.target.value)}
                                            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            rows={3}
                                        />
                                    ) : (
                                        <div className="truncate">{project.overviewText}</div>
                                    )}
                                </td>
                                <td className="px-4 py-2 max-w-xs">
                                    {editingId === project.id ? (
                                        <textarea
                                            value={editedProject?.description || ''}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            rows={3}
                                        />
                                    ) : (
                                        <div className="truncate">{project.description}</div>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingId === project.id ? (
                                        <div className="space-y-2">
                                            {(['overviewImage1', 'overviewImage2', 'overviewImage3'] as const).map((field) => (
                                                <div key={field} className="space-y-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleImageUpload(field, file);
                                                        }}
                                                        className="hidden"
                                                        id={`${field}-${project.id}`}
                                                    />
                                                    <div className="flex items-center space-x-2">
                                                        <label
                                                            htmlFor={`${field}-${project.id}`}
                                                            className={`block px-3 py-1 text-sm text-center rounded cursor-pointer
                                                                ${uploadingImage === field
                                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                                    : 'bg-blue-600 hover:bg-blue-700'
                                                                } text-white`}
                                                        >
                                                            {uploadingImage === field
                                                                ? 'Uploading...'
                                                                : 'Upload Image'
                                                            }
                                                        </label>
                                                        {editedProject && editedProject[field] && (
                                                            <button
                                                                onClick={() => handleDeleteImage(field)}
                                                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                    {editedProject && editedProject[field] && (
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            Current: {editedProject[field]}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {project.overviewImage1 && <div className="truncate">Image 1: ✓</div>}
                                            {project.overviewImage2 && <div className="truncate">Image 2: ✓</div>}
                                            {project.overviewImage3 && <div className="truncate">Image 3: ✓</div>}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingId === project.id ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editedProject?.link || ''}
                                                onChange={(e) => handleChange('link', e.target.value)}
                                                placeholder="Project URL"
                                                className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <input
                                                type="text"
                                                value={editedProject?.gitHubLink || ''}
                                                onChange={(e) => handleChange('gitHubLink', e.target.value)}
                                                placeholder="GitHub URL"
                                                className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {project.link && <div className="truncate">Project: ✓</div>}
                                            {project.gitHubLink && <div className="truncate">GitHub: ✓</div>}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {editingId === project.id ? (
                                        <input
                                            type="checkbox"
                                            checked={editedProject?.isActive ?? project.isActive}
                                            onChange={(e) => handleChange('isActive', e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    ) : (
                                        <span className={project.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                                            {project.isActive ? 'Visible' : 'Hidden'}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingId === project.id ? (
                                        <div className="flex flex-col space-y-2">
                                            <button
                                                onClick={() => handleSave(project.id)}
                                                className="w-full px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="w-full px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="w-full px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 