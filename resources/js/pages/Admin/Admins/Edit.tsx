import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, ImageIcon, Mail, Phone, Save, Trash2, Upload, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: 'dashboard' },
    { title: 'Admins', href: route('admin.admins.index') },
    { title: 'Edit Admin', href: '' },
];

interface Admin {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

export default function Edit({ admin }: { admin: Admin }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: admin.name || '',
        email: admin.email || '',
        phone: admin.phone || '',
        avatar: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(admin.avatar || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        post(route('admin.admins.update', admin.id), {
            data: {
                ...data,
            },
            preserveScroll: true,
            onProgress: (progress) => {
                if (progress.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onSuccess: () => {
                setIsUploading(false);
                setUploadProgress(0);
                toast.success('The admin was updated successfully.');
            },
            onError: () => {
                setIsUploading(false);
                setUploadProgress(0);
                toast.error('An error occurred during creation...')
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setData('avatar', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Admin" />
            <div className="fron-gray-50 min-h-screen bg-gradient-to-br to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
                <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
                    <CardHeader>
                        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8 dark:from-gray-900 dark:to-gray-800">
                            <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-gray-800">
                                <CardHeader>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/20 dark:bg-primary/30 rounded-xl p-3 shadow-sm backdrop-blur-sm">
                                                <User className="text-primary dark:text-primary-light" size={24} />
                                            </div>
                                            <div>
                                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Admin</h1>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Edit admin</p>
                                            </div>
                                        </div>

                                        <Link href={route('admin.admins.index')}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-2 text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <ArrowLeft size={16} />
                                                Back
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <form onSubmit={handleSubmit} className="p-6">
                                        <div className="mx-auto max-w-xl space-y-6">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <User size={14} className="text-primary dark:text-primary-light" />
                                                    Name
                                                </Label>

                                                <div className="group relative">
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500"
                                                        placeholder="Enter name"
                                                        required
                                                        autoFocus
                                                    />
                                                    <User
                                                        size={18}
                                                        className="group-hover:text-primary dark:group-hover:text-primary-light absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500"
                                                    />
                                                </div>

                                                {errors.name && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.name}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <Mail size={14} className="text-primary dark:text-primary-light" />
                                                    Email
                                                </Label>

                                                <div className="group relative">
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500"
                                                        placeholder="Enter email"
                                                        required
                                                        autoFocus
                                                    />
                                                    <Mail
                                                        size={18}
                                                        className="group-hover:text-primary dark:group-hover:text-primary-light absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500"
                                                    />
                                                </div>

                                                {errors.email && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.email}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <Phone size={14} className="text-primary dark:text-primary-light" />
                                                    Phone
                                                </Label>

                                                <div className="group relative">
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        className="focus:border-primary focus:ring-primary/20 dark:focus:border-primary-light dark:focus:ring-primary-light/20 h-12 w-full rounded-lg border border-gray-200 bg-white/80 pl-10 text-base text-gray-900 shadow-sm backdrop-blur-sm transition-all group-hover:border-gray-300 focus:ring-2 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:group-hover:border-gray-500"
                                                        placeholder="Enter phone"
                                                        required
                                                        autoFocus
                                                    />
                                                    <Phone
                                                        size={18}
                                                        className="group-hover:text-primary dark:group-hover:text-primary-light absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors dark:text-gray-500"
                                                    />
                                                </div>

                                                {errors.phone && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.phone}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="image"
                                                    className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <ImageIcon size={14} className="text-primary dark:text-primary-light" />
                                                    Admin Avatar
                                                </Label>

                                                <div className="group relative">
                                                    {!imagePreview ? (
                                                        <div
                                                            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white/80 p-4 text-center transition-all hover:border-gray-300 dark:border-gray-600 dark:bg-gray-800/80 dark:hover:border-gray-500"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Upload size={24} className="mb-2 text-gray-400 dark:text-gray-500" />
                                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload</p>
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                                        </div>
                                                    ) : (
                                                        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-gray-200 bg-white/80 transition-all dark:border-gray-600 dark:bg-gray-800/80">
                                                            <img src={imagePreview} alt="Category preview" className="h-full w-full object-cover" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all hover:bg-black/40">
                                                                <div className="flex gap-2 opacity-0 hover:opacity-100">
                                                                    <Button
                                                                        type="button"
                                                                        variant="secondary"
                                                                        size="sm"
                                                                        className="rounded-full"
                                                                        onClick={() => fileInputRef.current?.click()}
                                                                    >
                                                                        <Upload size={16} />
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        variant="secondary"
                                                                        size="sm"
                                                                        className="rounded-full"
                                                                        onClick={clearImage}
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        id="image"
                                                        name="avatar"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>

                                                {isUploading && data.avatar && (
                                                    <div className="mt-2">
                                                        <Progress value={uploadProgress} className="h-2 w-full bg-gray-200 dark:bg-gray-700" />
                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{uploadProgress}% uploaded</p>
                                                    </div>
                                                )}

                                                {errors.avatar && (
                                                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                                                        <AlertCircle size={14} />
                                                        <span>{errors.avatar}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-4">
                                                <Button type="submit" className="w-full" disabled={processing}>
                                                    <Save size={16} className="mr-2" />
                                                    Save Admin
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
