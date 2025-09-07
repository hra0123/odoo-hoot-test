# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'test your code',
    'version': '1.0',
    'category': 'Hidden/Tests',
    'sequence': 15,
    'summary': 'test your code',
    'website': 'https://www.odoo.com/app/crm',
    'depends': [
        'website'
    ],
    'data': [
    ],
    'demo': [
    ],
    'installable': True,
    'application': False,
    'assets': {
        'web.assets_unit_tests': [
            'test_your_code/static/tests/my_hoot.test.js',
        ]
    },
    'author': 'Odoo S.A.',
    'license': 'LGPL-3',
}
