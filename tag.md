# 配置服务，用于自动清理不活跃的用户会话
c.JupyterHub.services = [
    {
        'name': 'cull-idle',
        'admin': True,
        'command': [
            'python3',
            '-m', 'jupyterhub_idle_culler',
            '--timeout=1800',    # 30分钟无活动则视为不活跃
            '--cull-every=300',  # 每5分钟检查一次
            '--concurrency=10',  # 同时处理的最大请求数
        ],
    }
]
