from typing import Iterable
from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
    AbstractBaseUser,
    Permission,
    PermissionsMixin,
    BaseUserManager,
    Group,

)
from django.conf import settings
from django.utils import timezone
from uuid import UUID
import uuid
def generate_avatar(email):
    """メールアドレスを基にアバター URL を生成"""
    seed = email.split("@")[0] if email else "default"
    return f"https://api.dicebear.com/7.x/identicon/svg?seed={seed}"
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            ValueError('アカウント作成には、Emailが必要です。')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_staffuser(self, email, password=None, **extra_fields):
        extra_fields('is_staff', True)
        extra_fields('is_superuser', False)
        return self.create_user(email, password, **extra_fields)
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields('is_staff', True)
        extra_fields('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    avatar = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='ユーザーが所属するグループ'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='ユーザーに付与された権限'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def save(self, *args, **kwargs):
        if not self.avatar:
            self.avatar = generate_avatar(self.email)
        return super().save(*args, **kwargs)
    def __str__(self) -> str:
        return self.email
